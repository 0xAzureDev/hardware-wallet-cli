import { Client } from '@xchainjs/xchain-bitcoin';
import { Network } from '@xchainjs/xchain-client';
import { ethers } from 'ethers';
import { Chain } from './../types/index';
import { body, subheading } from './../utils/log';
import { login } from './../utils/login';

const btcAddress = async (mnemonic: string) => {
  // Create BTC client using @xchainjs/xchain-bitcoin
  const client = new Client({ phrase: mnemonic, network: Network.Mainnet });

  // Prints out the address of the wallet
  subheading('BTC address', false);
  body(client.getAddress());
};

const ethAddress = async (mnemonic: string) => {
  // Create ETH wallet
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);

  // Prints out the address of the wallet
  subheading('ETH address', false);
  body(wallet.address);
};

export const receive = async (chain: Chain, password: string, path: string) => {
  const mnemonic = await login(password, path);

  if (chain === 'btc') return await btcAddress(mnemonic);
  if (chain === 'eth') return await ethAddress(mnemonic);

  await btcAddress(mnemonic);
  await ethAddress(mnemonic);
};
