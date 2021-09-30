import { ethers } from "ethers";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import SwapJson from "../dojima/swap.json";

// "Web3.providers.givenProvider" will be set if in an Ethereum supported browser.
export const web3 = new Web3(
  Web3.givenProvider ||
    "http://0.0.0.0:9545" ||
    "http://localhost:8545" ||
    "ws://localhost:8546"
);

export const ethProvider = ethers.getDefaultProvider();

export const setWeb3Provider = (provider: string) => {
  web3.setProvider(provider);
};

//get default chain : mainnet
export const getDefaultChain = web3.eth.defaultChain;

//sets default chain
export const setDefaultChain = (
  chain: "goerli" | "kovan" | "rinkeby" | "ropsten" | "mainnet"
) => {
  web3.eth.defaultChain = chain;
};

//default common
export const getDefaultCommon = web3.eth.defaultCommon;

export const setDefaultCommon = (commonValue: any) => {
  web3.eth.defaultCommon = {
    customChain: {
      name: "dojima-network",
      chainId: 1,
      networkId: 5777,
    },
    baseChain: "mainnet",
    hardfork: "byzantium",
  };
};

export const getAddressBalance = async (address: string) => {
  return await web3.eth.getBalance(address);
};

export const createEthAccount = () => {
  return web3.eth.accounts.create();
};

// export const ethProvider = new ethers.providers.Web3Provider(
//   Web3.givenProvider
// );

export const pstTransferToAdress = async (amount: string): Promise<any> => {
  try {
    const { ethereum } = window;
    // const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const pstContractAddress = "";
    const address = accounts[0];
    console.log(address);

    const contract = new web3.eth.Contract(
      SwapJson as AbiItem[],
      pstContractAddress
    );
    await contract.methods
      .mint(address, web3.utils.toWei(amount, "ether"))
      .send({
        from: address,
      });
    return true;
  } catch (err: any) {
    return false;
  }
};
