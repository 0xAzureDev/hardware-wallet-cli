const Client = require('@xchainjs/xchain-bitcoin');
const { Network } = require('@xchainjs/xchain-client');
const { ethers } = require('ethers');
const { ERC20_ABI, ERC20_TOKENS, EVM_RPC } = require('../constants');
const { Chain } = require('../types/index');
const { body, subheading } = require('../utils/log');
const { login } = require('./../utils/login');

const btcBalance = async (mnemonic: string) => {
  // Load the client
  const client = new Client({ phrase: mnemonic, network: Network.Mainnet });
  const address = client.getAddress();

  subheading('BTC balance', false);

  // Gets the BTC balance using address
  const balance = await client.getBalance(address);

  body(`BTC ${balance[0].amount.amount().toNumber() / 10 ** 8}`);
};

const ethBalance = async (mnemonic: string, chain: typeof Chain = 'eth') => {
  // Error checking
  if (chain === 'btc') return;

  // Load the wallet
  const provider = new ethers.providers.JsonRpcProvider(EVM_RPC[chain]);
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);

  // Get the address and ETH balance
  const address = wallet.address;
  const balance = await provider.getBalance(address);

  subheading('ETH balance', false);

  body(`ETH ${ethers.utils.formatEther(balance)}`);

  // Prints all token balances in tokens list in constants.ts
  for (const token of ERC20_TOKENS) {
    try {
      const contract = new ethers.Contract(token.address, ERC20_ABI, provider);
      const tokenBalance = await contract.balanceOf(address);
      body(`${token.symbol} ${tokenBalance.toString()}`);
    } catch (_) {
      continue;
    }
  }
};

export const balance = async (chain: typeof Chain, password: string, path: string) => {
  const mnemonic = await login(password, path);

  if (chain === 'btc') return await btcBalance(mnemonic);
  if (chain === 'eth' || chain === 'bsc') return await ethBalance(mnemonic, chain);

  await btcBalance(mnemonic);
  await ethBalance(mnemonic);
};
