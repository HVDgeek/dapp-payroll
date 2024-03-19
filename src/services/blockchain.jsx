import { ethers } from "ethers";
import abi from "../abis/src/contracts/DappPayroll.sol/DappPayroll.json";
import address from "../abis/contractAddress.json";
import { store } from "../store";
import { globalActions } from "../store/globalSlices";

const { setConnectedAccount, setStats } = globalActions;
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
      await isConnectedWallet();
    });

    if (accounts.length > 0) {
      store.dispatch(setConnectedAccount(accounts[0]));
    } else {
      reportError("Please connect wallet");
      console.log("No accounts found");
    }
  } catch (error) {
    reportError(error);
  }
};

const loadStats = async () => {
  try {
    if (!ethereum) reportError("Please install Metamask!");
    const contract = await getEthereumContract();
    const stats = await contract.getMyStats();
    // console.log();
    store.dispatch(setStats(structuredOrg([stats])[0]));
  } catch (error) {
    reportError(error);
  }
};

const loadData = async () => {
  await loadStats();
};

const structuredOrg = (orgs) =>
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

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length <= maxLength) return text;

  const start = text.slice(0, startChars);
  const end = text.slice(-endChars);

  return `${start}...${end}`;
};

export { connectWallet, isConnectedWallet, truncate, loadData };
