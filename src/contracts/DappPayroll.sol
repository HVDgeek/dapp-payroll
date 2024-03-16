// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

/*
import "@openzeppelin/contracts/access/Ownable.sol";: This line imports the Ownable contract from OpenZeppelin,
which provides functionalities for access control to the contract,
allowing only the owner to execute certain actions.

import "@openzeppelin/contracts/utils/Counters.sol";: This line imports the Counters contract from OpenZeppelin,
which provides functionalities for secure counters.

using Counters for Counters.Counter;: This line enables the use of the Counters.Counter
data type from the Counters contract.
 */

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DappPayroll is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _totalPayrolls;
    Counters.Counter private _totalOrganizations;
    Counters.Counter private _totalWorkers;

    enum Status {
        OPEN,
        PENDING,
        DELETED,
        APPROVED,
        REJECTED,
        PAID
    }

    struct OrganizationStruct {
        uint id;
        string name;
        string description;
        address account; // admin
        uint payrolls;
        uint workers;
        uint payments;
        uint balance;
        uint cuts;
        uint timestamp;
    }

    struct PayrollStruct {
        uint id;
        uint oid;
        string name;
        string description;
        address officer;
        address organization; // admin
        uint salary;
        uint workers;
        uint cut;
        Status status;
        uint timestamp;
    }

    struct WorkerStruct {
        uint id; // unique identify id
        uint wid; // id in the payroll
        string name;
        address account;
        uint timestamp;
    }

    // Stablishing relationship between data
    mapping(uint => OrganizationStruct) organizations;
    mapping(uint => PayrollStruct) payrolls;
    mapping(uint => WorkerStruct) workers;
    mapping(address => bool) workerExists;
    mapping(uint => mapping(uint => WorkerStruct)) workersOf; // workersOf[payrollId][workerId]

    // Function that help us to create new organization
    function createOrg(string memory name, string memory description) public {
        require(bytes(name).length > 0, "Name cannot be empty!");
        require(bytes(description).length > 0, "Description cannot be empty!");

        _totalOrganizations.increment();
        OrganizationStruct memory org;

        org.id = _totalOrganizations.current();
        org.name = name;
        org.description = description;
        org.account = msg.sender;
        org.timestamp = getCurrentTime();

        organizations[org.id] = org;
    }

    // Update existing organization
    function updateOrg(
        uint id,
        string memory name,
        string memory description
    ) public {
        require(organizations[id].id != 0, "Organization not found!");
        require(
            organizations[id].account == msg.sender,
            "Unouthorized entity!"
        );
        require(bytes(name).length > 0, "Name cannot be empty!");
        require(bytes(description).length > 0, "Description cannot be empty!");

        organizations[id].name = name;
        organizations[id].description = description;
    }

    // Get information about organization
    function getOrgs()
        public
        view
        returns (OrganizationStruct[] memory Organization)
    {
        Organization = new OrganizationStruct[](_totalOrganizations.current());

        for (uint256 i = 0; i < _totalOrganizations.current(); i++) {
            Organization[i] = organizations[i + 1];
        }

        return Organization;
    }

    function getMyOrgs() public view returns (OrganizationStruct[] memory) {
        uint availableOrgs = 0;

        for (uint256 i = 0; i < _totalOrganizations.current(); i++) {
            if (organizations[i + 1].account == msg.sender) {
                availableOrgs++;
            }
        }

        OrganizationStruct[] memory myOrganizations = new OrganizationStruct[](
            availableOrgs
        );
        uint index = 0;

        for (uint256 i = 0; i < _totalOrganizations.current(); i++) {
            if (organizations[i + 1].account == msg.sender) {
                myOrganizations[index++] = organizations[i + 1];
            }
        }

        return myOrganizations;
    }

    function getOrgById(
        uint id
    ) public view returns (OrganizationStruct memory Organization) {
        return organizations[id];
    }

    function createPayroll(
        uint oid,
        string memory name,
        string memory description,
        uint salary,
        uint cut
    ) public {
        require(organizations[oid].id != 0, "Organization not found!");
        require(salary > 0 ether, "Salary must be greater than zero!");
        require(
            cut > 0 && cut <= 100,
            "Percentage Cut must be between (1 - 100)"
        );
        require(bytes(name).length > 0, "Name cannot be empty!");
        require(bytes(description).length > 0, "Description cannot be empty!");

        _totalPayrolls.increment();
        PayrollStruct memory payroll;

        payroll.id = _totalPayrolls.current();
        payroll.officer = msg.sender;
        payroll.name = name;
        payroll.description = description;
        payroll.salary = salary;
        payroll.cut = cut;
        payroll.oid = oid;
        payroll.organization = organizations[oid].account;
        payroll.timestamp = getCurrentTime();

        payrolls[payroll.id] = payroll;

        organizations[oid].payrolls++;
    }

    function updatePayroll(
        uint id,
        uint oid,
        string memory name,
        string memory description,
        uint salary,
        uint cut
    ) public {
        require(payrolls[id].id != 0, "Payroll not found!");
        require(payrolls[id].officer == msg.sender, "Unauthorized entity!");
        require(organizations[oid].id != 0, "Organization not found!");
        require(payrolls[id].status == Status.OPEN, "Payroll not available!");
        require(salary > 0 ether, "Salary must be greater than zero!");
        require(
            cut > 0 && cut <= 100,
            "Percentage Cut must be between (1 - 100)"
        );
        require(bytes(name).length > 0, "Name cannot be empty!");
        require(bytes(description).length > 0, "Description cannot be empty!");

        payrolls[id].name = name;
        payrolls[id].description = description;
        payrolls[id].salary = salary;
        payrolls[id].cut = cut;
        payrolls[id].organization = organizations[oid].account;
    }

    function deletePayroll(uint id) public {
        require(payrolls[id].id != 0, "Payroll not found!");
        require(payrolls[id].officer == msg.sender, "Unauthorized entity!");
        require(payrolls[id].status == Status.OPEN, "Payroll not available!");

        payrolls[id].status = Status.DELETED;
        organizations[payrolls[id].oid].payrolls--;
    }

    function submitPayroll(uint id) public {
        require(payrolls[id].id != 0, "Payroll not found!");
        require(payrolls[id].officer == msg.sender, "Unauthorized entity!");
        require(payrolls[id].status == Status.OPEN, "Payroll not available!");

        payrolls[id].status = Status.PENDING;
    }

    function approvePayroll(uint id) public {
        require(payrolls[id].id != 0, "Payroll not found!");
        require(
            payrolls[id].organization == msg.sender,
            "Unauthorized entity!"
        );
        require(payrolls[id].status == Status.PENDING, "Payroll not Pending!");

        payrolls[id].status = Status.APPROVED;
    }

    function rejectPayroll(uint id) public {
        require(payrolls[id].id != 0, "Payroll not found!");
        require(
            payrolls[id].organization == msg.sender,
            "Unauthorized entity!"
        );
        require(payrolls[id].status == Status.PENDING, "Payroll not Pending!");

        payrolls[id].status = Status.REJECTED;
    }

    function openPayroll(uint id) public {
        require(payrolls[id].id != 0, "Payroll not found!");
        require(
            payrolls[id].officer == msg.sender ||
                payrolls[id].organization == msg.sender,
            "Unauthorized entity!"
        );
        require(payrolls[id].status == Status.PENDING, "Payroll not Pending!");

        payrolls[id].status = Status.OPEN;
    }

    function getPayrolls()
        public
        view
        returns (PayrollStruct[] memory Payrolls)
    {
        uint availablePayrolls = 0;

        for (uint256 i = 0; i < _totalPayrolls.current(); i++) {
            if (payrolls[i + 1].status != Status.DELETED) {
                availablePayrolls++;
            }
        }

        Payrolls = new PayrollStruct[](availablePayrolls);
        uint index = 0;

        for (uint256 i = 0; i < _totalPayrolls.current(); i++) {
            if (payrolls[i + 1].status != Status.DELETED) {
                Payrolls[index++] = payrolls[i + 1];
            }
        }

        return Payrolls;
    }

    function getPayrollById(
        uint id
    ) public view returns (PayrollStruct memory) {
        return payrolls[id];
    }

    function getMyPayrollsByOrg(
        uint oid
    ) public view returns (PayrollStruct[] memory Payrolls) {
        uint availablePayrolls = 0;
        for (uint256 i = 0; i < _totalPayrolls.current(); i++) {
            if (
                payrolls[i + 1].status != Status.DELETED &&
                payrolls[i + 1].oid == oid &&
                (payrolls[i + 1].officer == msg.sender ||
                    payrolls[i + 1].organization == msg.sender)
            ) {
                availablePayrolls++;
            }
        }

        Payrolls = new PayrollStruct[](availablePayrolls);
        uint index = 0;

        for (uint256 i = 0; i < _totalPayrolls.current(); i++) {
            if (
                payrolls[i + 1].status != Status.DELETED &&
                payrolls[i + 1].oid == oid &&
                (payrolls[i + 1].officer == msg.sender ||
                    payrolls[i + 1].organization == msg.sender)
            ) {
                Payrolls[index++] = payrolls[i + 1];
            }
        }

        return Payrolls;
    }

    function getMyActivePayrolls()
        public
        view
        returns (PayrollStruct[] memory Payrolls)
    {
        uint availablePayrolls = 0;
        for (uint256 i = 0; i < _totalPayrolls.current(); i++) {
            if (
                payrolls[i + 1].status != Status.DELETED &&
                (payrolls[i + 1].officer == msg.sender ||
                    payrolls[i + 1].organization == msg.sender)
            ) {
                availablePayrolls++;
            }
        }

        Payrolls = new PayrollStruct[](availablePayrolls);
        uint index = 0;

        for (uint256 i = 0; i < _totalPayrolls.current(); i++) {
            if (
                payrolls[i + 1].status != Status.DELETED &&
                (payrolls[i + 1].officer == msg.sender ||
                    payrolls[i + 1].organization == msg.sender)
            ) {
                Payrolls[index++] = payrolls[i + 1];
            }
        }

        return Payrolls;
    }

    function createWorker(
        uint pid,
        string[] memory names,
        address[] memory accounts
    ) public {
        require(payrolls[pid].id != 0, "Payroll not found!");
        require(
            payrolls[pid].officer == msg.sender ||
                payrolls[pid].organization == msg.sender,
            "Unauthorized entity!"
        );
        require(names.length > 0, "Names array cannot be empty!");
        require(accounts.length > 0, "Accounts array cannot be empty!");

        for (uint256 i = 0; i < accounts.length; i++) {
            _totalWorkers.increment();
            WorkerStruct memory worker;

            worker.id = _totalWorkers.current();
            worker.wid = payrolls[pid].workers + 1;
            worker.name = names[i];
            worker.account = accounts[i];
            worker.timestamp = getCurrentTime();

            workersOf[pid][worker.wid] = worker;
            payrolls[pid].workers++;
            organizations[payrolls[pid].oid].workers++;

            if (!workerExists[accounts[i]]) {
                workerExists[accounts[i]] = true;
                workers[worker.id] = worker;
            }
        }
    }

    function updateWorker(
        uint wid,
        uint pid,
        string memory name,
        address account
    ) public {
        require(workersOf[pid][wid].id != 0, "Worker not found!");
        require(
            payrolls[pid].officer == msg.sender ||
                payrolls[pid].organization == msg.sender,
            "Unauthorized entity!"
        );
        require(bytes(name).length > 0, "Name cannot be empty!");
        require(account != address(0), "Account cannot be empty!");

        workersOf[pid][wid].name = name;
        workersOf[pid][wid].account = account;

        workers[workersOf[pid][wid].id].name = name;
        workers[workersOf[pid][wid].id].account = account;
    }

    function deleteWorker(uint wid, uint pid) public {
        require(workersOf[pid][wid].id != 0, "Worker not found!");
        require(payrolls[pid].officer == msg.sender, "Unauthorized entity!");

        delete workersOf[pid][wid];
        organizations[payrolls[pid].oid].workers--;
    }

    function payWorkers(uint pid) public nonReentrant {
        require(payrolls[pid].id != 0, "Payroll not found!");
        require(payrolls[pid].officer == msg.sender, "Unauthorized entity!");
        require(
            payrolls[pid].status == Status.APPROVED,
            "Payroll not Approved!"
        );
        require(
            organizations[payrolls[pid].oid].balance >=
                payrolls[pid].workers * payrolls[pid].salary,
            "Insufficient fund"
        );

        uint numWorker = payrolls[pid].workers;
        uint salary = payrolls[pid].salary;
        uint cut = (salary * payrolls[pid].salary) / 100;

        for (uint256 wid = 1; wid <= numWorker; wid++) {
            address account = workersOf[pid][wid].account;
            // Paying of salary
            payTo(account, (salary - cut));
        }

        organizations[payrolls[pid].oid].balance -= salary * numWorker;
        organizations[payrolls[pid].oid].cuts += cut * numWorker;
        organizations[payrolls[pid].oid].payments++;

        payrolls[pid].status = Status.PAID;
    }

    function getPayrollWorkers(
        uint pid
    ) public view returns (WorkerStruct[] memory Workers) {
        Workers = new WorkerStruct[](payrolls[pid].workers);

        for (uint256 i = 0; i < payrolls[pid].workers; i++) {
            Workers[i] = workersOf[pid][i + 1];
        }

        return Workers;
    }

    // Single worker
    function getPayrollWorker(
        uint pid,
        uint wid
    ) public view returns (WorkerStruct memory Worker) {
        return workersOf[pid][wid];
    }

    function getAllWorkers()
        public
        view
        returns (WorkerStruct[] memory Workers)
    {
        Workers = new WorkerStruct[](_totalWorkers.current());

        for (uint256 i = 0; i < _totalWorkers.current(); i++) {
            Workers[i] = workers[i + 1];
        }

        return Workers;
    }

    function fundOrg(uint oid) public payable {
        require(msg.value > 0 ether, "Insufficient amount!");
        organizations[oid].balance += msg.value;
    }

    function getMyStats()
        public
        view
        returns (OrganizationStruct memory Organization)
    {
        for (uint256 i = 0; i < _totalOrganizations.current(); i++) {
            if (organizations[i + 1].account == msg.sender) {
                Organization.id++;
                Organization.name = "Your Global Stats";
                Organization
                    .description = "Your statistics accross all organizations created by you";
                Organization.account = msg.sender;
                Organization.payments += organizations[i + 1].payments;
                Organization.payrolls += organizations[i + 1].payrolls;
                Organization.workers += organizations[i + 1].workers;
                Organization.balance += organizations[i + 1].balance;
            }
        }

        return Organization;
    }

    function payTo(address to, uint amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        if (!success) revert("Payment failed!");
    }

    function getCurrentTime() internal view returns (uint) {
        return (block.timestamp * 1000) + 1000;
    }
}
