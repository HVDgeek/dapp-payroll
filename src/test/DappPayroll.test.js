import { expect } from "chai";
import { ethers } from "hardhat";

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

describe("Contract", () => {
  let contract, result;

  // Organization data
  const oid = 1;
  const orgName = "Dapp Company";
  const orgDesc = "The Better Web3 Company in the World!";

  // Payroll data
  const pid = 1;
  const payrollOrg = "Tech Department Payroll";
  const payrollDesc = "A list of programmer payments";
  const payrollSalary = toWei(0.5);
  const payrollCut = 5;

  const status = {
    OPEN: 0,
    PANDING: 1,
    DELETED: 2,
    APPROVED: 3,
    REJECTED: 4,
    PAID: 5,
  };

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory("DappPayroll");
    const [orgAcc1, orgAcc2, officer1, officer2, worker1, worker2] =
      await ethers.getSigners();
    contract = await Contract.deploy();
    await contract.deployed();
  });
});
