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

  mapping (uint => OrganizationStruct ) organizations;
  mapping (uint => PayrollStruct ) payrolls;
  mapping (uint => WorkerStruct ) workers;
  mapping (address => bool ) workerExists;
  mapping (uint => mapping (uint => WorkerStruct)) workersOf;


}
