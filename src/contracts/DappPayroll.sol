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
    DELECTED,
    APPROVED,
    REJECTED,
    PAID
  }

  struct OrganizationStruct {
    uint id;
    string name;
    string description;
    address account;
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
    address organization;
    uint salary;
    uint workers;
    uint cut;
    Status status;
    uint timestamp;
  }

  struct WorkerStruct {
    uint id;  // unique identify id
    uint wid; // id in the payroll
    string name;
    address account;
    uint timestamp;
  }

  // Stablishing relationship between data
  mapping (uint => OrganizationStruct ) organizations;
  mapping (uint => PayrollStruct ) payrolls;
  mapping (uint => WorkerStruct ) workers;
  mapping (address => bool ) workerExists;
  mapping (uint => mapping (uint => WorkerStruct)) workersOf;

  // Function that help us to create new organization
  function createOrg( string memory name, string memory description ) public  {
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
  function updateOrg(uint id, string memory name, string memory description ) public  {
    require(organizations[id].id != 0,  "Organization not found!");
    require(organizations[id].account == msg.sender,  "Unouthorized entity!");
    require(bytes(name).length > 0, "Name cannot be empty!");
    require(bytes(description).length > 0, "Description cannot be empty!");

    organizations[id].name = name;
    organizations[id].description = description;
  }

  // Get information about organization
  function getOrgs() public view returns(OrganizationStruct[] memory Organization) {
    Organization = new OrganizationStruct[](_totalOrganizations.current());

    for (uint256 i = 0; i < _totalOrganizations.current(); i++) {
      Organization[i] = organizations[i + 1];
    }

    return Organization
  }

  function getMyOrgs() public view returns(OrganizationStruct[] memory) {
    uint availableOrgs = 0;

    for (uint256 i = 0; i < _totalOrganizations.current(); i++) {
      if (organizations[i + 1].account == msg.sender) {
        availableOrgs++;
      }
    }


    OrganizationStruct[] memory myOrganizations = new OrganizationStruct[](availableOrgs);
    uint index = 0;

    for (uint256 i = 0; i < _totalOrganizations.current(); i++) {
      if (organizations[i + 1].account == msg.sender) {
        myOrganizations[index++] = organizations[i + 1];
      }
    }

    return myOrganizations;
  }

  function getOrgById(uint id) public view returns(OrganizationStruct memory Organization) {
    return organizations[id];
  }

  function getCurrentTime() internal view returns (uint) {
    return (block.timestamp * 1000) + 1000;
  }
}
