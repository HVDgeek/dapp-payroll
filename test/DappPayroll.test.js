const { expect } = require("chai");
const { ethers } = require("hardhat");

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
  const payrollName = "Tech Department Payroll";
  const payrollDesc = "A list of programmer payments";
  const payrollSalary = toWei(0.5);
  const payrollCut = 5;

  const Status = {
    OPEN: 0,
    PENDING: 1,
    DELETED: 2,
    APPROVED: 3,
    REJECTED: 4,
    PAID: 5,
  };

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory("DappPayroll");
    [orgAcc1, orgAcc2, officer1, officer2, worker1, worker2, worker3] =
      await ethers.getSigners();

    contract = await Contract.deploy();
    await contract.deployed();
  });

  // describe("Organization", () => {
  //   it("should comfirm organization creation", async () => {
  //     result = await contract.getOrgs();
  //     expect(result).to.have.lengthOf(0);

  //     result = await contract.connect(orgAcc2).getMyOrgs();
  //     expect(result).to.have.lengthOf(0);

  //     await contract.createOrg(orgName, orgDesc);
  //     result = await contract.getOrgs();
  //     expect(result).to.have.lengthOf(1);

  //     result = await contract.getMyOrgs();
  //     expect(result).to.have.lengthOf(1);

  //     result = await contract.connect(orgAcc2).getMyOrgs();
  //     expect(result).to.have.lengthOf(0);
  //   });

  //   it("should comfirm organization update", async () => {
  //     await contract.createOrg(orgName, orgDesc);

  //     result = await contract.getOrgById(oid);
  //     expect(result.name).to.be.equal(orgName);
  //     expect(result.description).to.be.equal(orgDesc);

  //     const newName = "New Organization Name";
  //     const newDesc = "My New Description for New Organization";

  //     await contract.updateOrg(oid, newName, newDesc);

  //     result = await contract.getOrgById(oid);
  //     expect(result.name).to.be.equal(newName);
  //     expect(result.description).to.be.equal(newDesc);
  //   });
  // });

  // describe("Payroll", () => {
  //   beforeEach(async () => {
  //     await contract.createOrg(orgName, orgDesc);
  //     await contract.connect(orgAcc2).createOrg(orgName, orgDesc);
  //   });

  //   it("should confirm payroll creation", async () => {
  //     result = await contract.getPayrolls();
  //     expect(result).to.have.lengthOf(0);

  //     result = await contract.getMyActivePayrolls();
  //     expect(result).to.have.lengthOf(0);

  //     await contract
  //       .connect(officer1)
  //       .createPayroll(
  //         oid,
  //         payrollName,
  //         payrollDesc,
  //         payrollSalary,
  //         payrollCut,
  //       );

  //     result = await contract.getPayrolls(); // orgAcc1
  //     expect(result).to.have.lengthOf(1);

  //     result = await contract.getMyActivePayrolls(); // orgAcc1
  //     expect(result).to.have.lengthOf(1);

  //     result = await contract.connect(officer1).getMyActivePayrolls(); // officer1
  //     expect(result).to.have.lengthOf(1);

  //     result = await contract.connect(officer2).getMyActivePayrolls();
  //     expect(result).to.have.lengthOf(0);

  //     result = await contract.getPayrollById(pid);
  //     expect(result.name).to.be.equal(payrollName);
  //     expect(result.description).to.be.equal(payrollDesc);
  //     expect(result.officer).to.be.equal(officer1.address);
  //     expect(result.organization).to.be.equal(orgAcc1.address);
  //   });

  //   it("should confirm payroll update", async () => {
  //     await contract
  //       .connect(officer1)
  //       .createPayroll(
  //         oid,
  //         payrollName,
  //         payrollDesc,
  //         payrollSalary,
  //         payrollCut,
  //       );

  //     result = await contract.getPayrollById(pid);
  //     expect(result.name).to.be.equal(payrollName);
  //     expect(result.description).to.be.equal(payrollDesc);
  //     expect(result.organization).to.be.equal(orgAcc1.address);

  //     const newPayrollName = "New Payroll Name Test";
  //     const newPayrollDesc = "New Payroll Description Test";

  //     // Only officer can update the payroll
  //     await contract
  //       .connect(officer1)
  //       .updatePayroll(
  //         pid,
  //         oid + 1,
  //         newPayrollName,
  //         newPayrollDesc,
  //         payrollSalary,
  //         payrollCut,
  //       );

  //     result = await contract.getPayrollById(pid);
  //     expect(result.name).to.be.equal(newPayrollName);
  //     expect(result.description).to.be.equal(newPayrollDesc);
  //     expect(result.organization).to.be.equal(orgAcc2.address);
  //   });

  //   it("should confirm payroll delete", async () => {
  //     result = await contract.getOrgById(oid);
  //     expect(result.payrolls).to.be.equal(0);

  //     await contract
  //       .connect(officer1)
  //       .createPayroll(
  //         oid,
  //         payrollName,
  //         payrollDesc,
  //         payrollSalary,
  //         payrollCut,
  //       );

  //     result = await contract.getPayrollById(pid);
  //     expect(result.status).to.be.equal(Status.OPEN);

  //     result = await contract.getOrgById(oid);
  //     expect(result.payrolls).to.be.equal(1);

  //     await contract.connect(officer1).deletePayroll(pid);

  //     result = await contract.getPayrollById(pid);
  //     expect(result.status).to.be.equal(Status.DELETED);

  //     result = await contract.getOrgById(oid);
  //     expect(result.payrolls).to.be.equal(0);
  //   });
  //   it("should confirm payroll approval", async () => {
  //     await contract
  //       .connect(officer1)
  //       .createPayroll(
  //         oid,
  //         payrollName,
  //         payrollDesc,
  //         payrollSalary,
  //         payrollCut,
  //       );

  //     result = await contract.getPayrollById(pid);
  //     expect(result.status).to.be.equal(Status.OPEN);

  //     await contract.connect(officer1).submitPayroll(pid);

  //     result = await contract.getPayrollById(pid);
  //     expect(result.status).to.be.equal(Status.PENDING);

  //     await contract.approvePayroll(pid); // orgAcc1

  //     result = await contract.getPayrollById(pid);
  //     expect(result.status).to.be.equal(Status.APPROVED);
  //   });

  //   it("should confirm payroll reject", async () => {
  //     await contract
  //       .connect(officer1)
  //       .createPayroll(
  //         oid,
  //         payrollName,
  //         payrollDesc,
  //         payrollSalary,
  //         payrollCut,
  //       );

  //     result = await contract.getPayrollById(pid);
  //     expect(result.status).to.be.equal(Status.OPEN);

  //     await contract.connect(officer1).submitPayroll(pid);

  //     result = await contract.getPayrollById(pid);
  //     expect(result.status).to.be.equal(Status.PENDING);

  //     await contract.rejectPayroll(pid); // orgAcc1

  //     result = await contract.getPayrollById(pid);
  //     expect(result.status).to.be.equal(Status.REJECTED);
  //   });

  //   it("should confirm payroll open", async () => {
  //     await contract
  //       .connect(officer1)
  //       .createPayroll(
  //         oid,
  //         payrollName,
  //         payrollDesc,
  //         payrollSalary,
  //         payrollCut,
  //       );

  //     result = await contract.getPayrollById(pid);
  //     expect(result.status).to.be.equal(Status.OPEN);

  //     await contract.connect(officer1).submitPayroll(pid);

  //     result = await contract.getPayrollById(pid);
  //     expect(result.status).to.be.equal(Status.PENDING);

  //     await contract.openPayroll(pid); // orgAcc1

  //     result = await contract.getPayrollById(pid);
  //     expect(result.status).to.be.equal(Status.OPEN);
  //   });
  // });

  describe("Worker", () => {
    beforeEach(async () => {
      await contract.createOrg(orgName, orgDesc);
      await contract
        .connect(officer1)
        .createPayroll(
          oid,
          payrollName,
          payrollDesc,
          payrollSalary,
          payrollCut,
        );
    });

    // it("should confirm worker creation", async () => {
    //   result = await contract.getPayrollWorkers(pid);
    //   expect(result).to.have.lengthOf(0);

    //   const names = ["Lionel Messi", "Xavi Hernandez", "Andres Iniesta"];
    //   const accounts = [worker1.address, worker2.address, worker3.address];

    //   await contract.connect(officer1).createWorker(pid, names, accounts);

    //   result = await contract.getPayrollWorkers(pid);
    //   expect(result).to.have.lengthOf(accounts.length);
    // });

    it("should confirm worker update", async () => {
      const wid = 1;
      const newName = "Diego Maradona";

      const name = "Lionel Messi";
      const account = worker2.address;

      const names = [name];
      const accounts = [account];

      await contract.connect(officer1).createWorker(pid, names, accounts);
      result = await contract.getPayrollWorker(pid, wid);

      expect(result.name).to.be.equal(name);
      expect(result.account).to.be.equal(account);

      await contract.connect(officer1).updateWorker(wid, pid, newName, account);
      result = await contract.getPayrollWorker(pid, wid);

      expect(result.name).to.be.equal(newName);
      expect(result.account).to.be.equal(account);
    });
  });
});
