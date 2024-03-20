const { ethers } = require("hardhat");
const fs = require("fs");
const { faker } = require("@faker-js/faker");

const toWei = (num) => ethers.utils.parseEther(num.toString());
let contract, result;
async function main() {
  const contractName = "DappPayroll";
  const Contract = await ethers.getContractFactory(contractName);
  contract = await Contract.deploy();

  await contract.deployed();

  //... Start a process here
  const [orgAcc, officer, worker1, worker2, worker3] =
    await ethers.getSigners();

  // Organization Data
  const oid = 1;
  const pid = 1;

  for (let i = 0; i < 4; i++) {
    const orgName = faker.company.name();
    const orgDesc = faker.lorem.paragraph({ min: 1, max: 3 });

    const payrollName = faker.person.jobTitle() + " Payroll";
    const payrollDesc = faker.lorem.sentence();
    const payrollSalary = toWei(
      faker.number.float({ min: 0.1, max: 1, precision: 0.1 }),
    );
    const payrollCut = Number(faker.commerce.price({ min: 3, max: 10 }));

    await contract.createOrg(orgName, orgDesc);
    await contract
      .connect(officer)
      .createPayroll(oid, payrollName, payrollDesc, payrollSalary, payrollCut);

    const names = ["Lionel Messi", "Xavi Hernandez", "Andres Iniesta"];
    const accounts = [worker1.address, worker2.address, worker3.address];

    await contract.connect(officer).createWorker(pid, names, accounts);
  }

  result = await contract.getOrgs();
  console.log(result);

  result = await contract.getPayrolls();
  console.log(result);

  result = await contract.getPayrollWorkers(pid);
  console.log(result);

  //... End a process here

  const address = JSON.stringify({ address: contract.address }, null, 4);
  fs.writeFile("./src/abis/contractAddress.json", address, "utf-8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Deployed contract address", contract.address);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
