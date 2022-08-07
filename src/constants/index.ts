const path = require('path');
const { erc20_abi } = require('./abi');

export const EVM_RPC = {
  eth: 'https://eth-mainnet.public.blastapi.io',
  bsc: 'https://bsc-dataseed.binance.org',
};

export const ERC20_TOKENS = [
  {
    address: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
    symbol: 'USDC', // ETH
  },
  {
    address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    symbol: 'USDC', // BSC
  },
];

export const DEFAULT_PATH = path.join(path.resolve(), '..', 'keys/wallet.json');

export const ERC20_ABI = erc20_abi;

export const BTC_MEMO = 'payment';
