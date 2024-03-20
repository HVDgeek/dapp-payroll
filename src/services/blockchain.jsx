import { ethers } from "ethers";
import abi from "../abis/src/contracts/DappPayroll.sol/DappPayroll.json";
import address from "../abis/contractAddress.json";
import { store } from "../store";
import { globalActions } from "../store/globalSlices";

const { setConnectedAccount, setStats, setAllOrgs, setOrgs, setPayrolls } =
  globalActions;
const { ethereum } = window;

const contractAddress = address.address;
const contractAbi = abi.abi;

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

const getEthereumContract = async () => {
  const connectedAccount = store.getState().globalState.connectedAccount;
  const provider = connectedAccount
    ? new ethers.providers.Web3Provider(ethereum)
    : new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  return contract;
};

const connectWallet = async () => {
  try {
    if (!ethereum) return reportError("Please install metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    store.dispatch(setConnectedAccount(accounts[0]));
  } catch (error) {
    reportError(error);
  }
};

const isConnectedWallet = async () => {
  try {
    if (!ethereum) return reportError("Please install metamask");
    const accounts = await await ethereum.request({ method: "eth_accounts" });

    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      store.dispatch(setConnectedAccount(accounts[0]));
      await loadData();
      await isConnectedWallet();
    });

    if (accounts.length) {
      store.dispatch(setConnectedAccount(accounts[0]));
    } else {
      // reportError("Please connect wallet");
      store.dispatch(setConnectedAccount(""));
      console.log("No accounts found");
    }
  } catch (error) {
    reportError(error);
  }
};

// STATS
const loadStats = async () => {
  try {
    if (!ethereum) reportError("Please install Metamask!");
    const contract = await getEthereumContract();
    const stats = await contract.getMyStats();
    // console.log();
    store.dispatch(setStats(structuredOrgs([stats])[0]));
  } catch (error) {
    reportError(error);
  }
};

// ORGANIZATIONS

const loadOrgs = async () => {
  try {
    if (!ethereum) reportError("Please install Metamask!");
    const contract = await getEthereumContract();
    const orgs = await contract.getOrgs();

    store.dispatch(setAllOrgs(structuredOrgs(orgs)));
  } catch (error) {
    reportError(error);
  }
};

const loadMyOrgs = async () => {
  try {
    if (!ethereum) reportError("Please install Metamask!");
    const contract = await getEthereumContract();
    const orgs = await contract.getMyOrgs();
    store.dispatch(setOrgs(structuredOrgs(orgs)));
  } catch (error) {
    reportError(error);
  }
};

const fundOrg = async (oid, amount) => {
  if (!ethereum) reportError("Please install Metamask!");
  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract();
      const tx = await contract.fundOrg(oid, { value: toWei(amount) });

      tx.wait().then(async () => {
        await loadData();
      });
      resolve(tx);
    } catch (error) {
      reportError(error);
      reject(error);
    }
  });
};

const createOrg = async (name, description) => {
  if (!ethereum) reportError("Please install Metamask!");
  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract();
      const tx = await contract.createOrg(name, description);

      tx.wait().then(async () => {
        await loadData();
      });
      resolve(tx);
    } catch (error) {
      reportError(error);
      reject(error);
    }
  });
};

const updateOrg = async ({ id, name, description }) => {
  if (!ethereum) reportError("Please install Metamask!");
  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract();
      const tx = await contract.updateOrg(id, name, description);

      tx.wait().then(async () => {
        await loadData();
      });
      resolve(tx);
    } catch (error) {
      reportError(error);
      reject(error);
    }
  });
};

// PAYROLLS

const createPayroll = async ({ oid, name, description, salary, cut }) => {
  if (!ethereum) reportError("Please install Metamask!");

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract();
      const tx = await contract.createPayroll(
        oid,
        name,
        description,
        toWei(Number(salary)),
        cut,
      );

      tx.wait().then(async () => {
        await loadData();
        await loadPayrollByOrg(oid);
      });
      resolve(tx);
    } catch (error) {
      reportError(error);
      reject(error);
    }
  });
};

const updatePayroll = async ({ id, oid, name, description, salary, cut }) => {
  if (!ethereum) reportError("Please install Metamask!");

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract();
      const tx = await contract.updatePayroll(
        id,
        oid,
        name,
        description,
        toWei(Number(salary)),
        cut,
      );

      tx.wait().then(async () => {
        await loadData();
        await loadPayrollByOrg(oid);
      });
      resolve(tx);
    } catch (error) {
      reportError(error);
      reject(error);
    }
  });
};

const loadPayrollByOrg = async (oid) => {
  try {
    if (!ethereum) reportError("Please install Metamask!");
    const contract = await getEthereumContract();
    const payrolls = await contract.getMyPayrollsByOrg(oid);
    // console.log({ payrolls });
    store.dispatch(setPayrolls(structuredPayrolls(payrolls)));
  } catch (error) {
    reportError(error);
  }
};

const loadData = async () => {
  await loadStats();
  await loadOrgs();
  await loadMyOrgs();
};

const structuredOrgs = (orgs) =>
  orgs.map((org) => ({
    id: org.id.toNumber(),
    account: org.account,
    cuts: fromWei(org.cuts),
    balance: fromWei(org.balance),
    name: org.name,
    description: org.description,
    payments: org.payments.toNumber(),
    payrolls: org.payrolls.toNumber(),
    workers: org.workers.toNumber(),
  }));

const structuredPayrolls = (payrolls) =>
  payrolls.map((payroll) => ({
    id: payroll.id.toNumber(),
    oid: payroll.oid.toNumber(),
    name: payroll.name,
    description: payroll.description,
    owner: payroll.officer,
    organization: payroll.organization,
    cut: payroll.cut.toNumber(),
    salary: fromWei(payroll.salary),
    status: payroll.status,
    workers: payroll.workers.toNumber(),
    timestamp: payroll.timestamp.toNumber(),
  }));

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length <= maxLength) return text;

  const start = text.slice(0, startChars);
  const end = text.slice(-endChars);

  return `${start}...${end}`;
};

const reportError = (error) => {
  console.error(error);
};

export {
  connectWallet,
  isConnectedWallet,
  truncate,
  loadData,
  fundOrg,
  createOrg,
  updateOrg,
  createPayroll,
  updatePayroll,
  loadPayrollByOrg,
};
