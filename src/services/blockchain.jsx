import { ethers } from "ethers";
import { store } from "../store";
import { globalActions } from "../store/globalSlices";

const { setConnectedAccount } = globalActions;

const { ethereum } = window;

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

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length <= maxLength) return text;

  const start = text.slice(0, startChars);
  const end = text.slice(-endChars);

  return `${start}...${end}`;
};

export { connectWallet, isConnectedWallet, truncate };
