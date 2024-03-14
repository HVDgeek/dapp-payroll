// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DappPayroll is Ownable, ReentrancyGuard {
  using Counters for Counters.Counter;

  Counters.Counter private _totalPayrolls;
  Counters.Counter private _totalOrganizations;
  Counters.Counter private _totalWorkers;

}
