import { Client } from '@xchainjs/xchain-bitcoin';
import { Network } from '@xchainjs/xchain-client';
import { ethers } from 'ethers';
import { ERC20_ABI, ERC20_TOKENS, EVM_RPC } from '../constants';
import { Chain } from '../types';
import { body, subheading } from '../utils/log';
import { login } from './../utils/login';

const btcBalance = async (mnemonic: string) => {
  // Load the client
  const client = new Client({ phrase: mnemonic, network: Network.Mainnet });
  const address = client.getAddress();

  subheading('BTC balance', false);

  // Gets the BTC balance using address
  const balance = await client.getBalance(address);

  body(`BTC ${balance[0].amount.amount().toNumber() / 10 ** 8}`);
};

const ethBalance = async (mnemonic: string, chain: Chain = 'eth') => {
  // Error checking
  if (chain === 'btc') return

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

export const balance = async (chain: Chain, password: string, path: string) => {
  const mnemonic = await login(password, path);

  if (chain === 'btc') return await btcBalance(mnemonic);
  if (chain === 'eth' || chain === 'bsc') return await ethBalance(mnemonic, chain);

  await btcBalance(mnemonic);
  await ethBalance(mnemonic);
};
