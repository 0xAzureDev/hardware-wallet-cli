import { Client } from '@xchainjs/xchain-bitcoin';
import { Network } from '@xchainjs/xchain-client';
import { assetAmount, AssetBTC, assetToBase } from '@xchainjs/xchain-util';
import { ethers } from 'ethers';
import { BTC_MEMO, ERC20_ABI, EVM_RPC } from '../constants';
import { Chain } from '../types';
import { login } from '../utils/login';
import { subheading } from './../utils/log';
import { validateERC20 } from './../utils/validate';

const sendBtc = async (mnemonic: string, to: string, amount: number) => {
  // Create bitcoin client using @xchainjs/xchain-bitcoin
  const client = new Client({ phrase: mnemonic, network: Network.Mainnet });

  // Validate BTC address otherwise, return error
  if (!client.validateAddress(to)) return subheading(`Invalid address ${to}`, false);

  const balance = (await client.getBalance(client.getAddress()))[0].amount.amount().toNumber() / 10 ** 8;
  // TODO get gas rate from midgard <16>
  const fee = (16 * 250) / 10 ** 8;

  let value = assetToBase(assetAmount(amount, 8));

  // Check if the user has enough balance otherwise sends max balance
  if (amount + fee > balance) value = assetToBase(assetAmount(balance - fee, 8));

  try {
    // Construct the transaction
    const txid = await client.transfer({
      asset: AssetBTC,
      recipient: to,
      amount: value,
      memo: BTC_MEMO,
    });
    subheading(`Sent ${amount} BTC to ${to} with txid ${txid}`, true);
  } catch (error) {
    subheading(`Transfer failed ${error}`, false);
  }
};

const sendEth = async (mnemonic: string, chain: Chain, to: string, amount: number) => {
  // Validate ETH send address otherwise, return error
  if (!validateERC20(to)) return subheading(`Invalid address ${to}`, false);

  // Error checking
  if (chain === 'btc') return

  // Generate wallet w/ provider
  const provider = new ethers.providers.JsonRpcProvider(EVM_RPC[chain]);
  const signer = ethers.Wallet.fromMnemonic(mnemonic);
  const wallet = signer.connect(provider);

  // Calculate the ETH fee
  const gasPrice = await provider.getGasPrice();
  const gasLimit = ethers.utils.hexlify(21000);
  const nonce = await provider.getTransactionCount(wallet.address);
  const fee = gasPrice.mul(gasLimit);

  // Raw balance and amount in ether
  const balance = await provider.getBalance(wallet.address);
  let value = ethers.utils.parseEther(amount.toString());

  // Check if the user has enough balance otherwise sends max balance
  if (value.add(fee).gt(balance)) value = balance.sub(fee);

  // Construct the transaction
  const tx = {
    from: wallet.address,
    to: to,
    value: value,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    nonce: nonce,
  };

  try {
    const txid = await wallet.sendTransaction(tx);
    subheading(`Sent ${ethers.utils.formatUnits(value.toString(), 18)} ETH to ${to} with txHash ${txid.hash}`, true);
  } catch (error) {
    subheading(`Transfer failed ${error}`, false);
  }
};

const sendToken = async (mnemonic: string, chain: Chain, to: string, token: string, amount: number) => {
  // Checks to validate, to and token address
  if (!token) return subheading(`Please input a token address to send`, false);
  if (!validateERC20(to)) return subheading(`Invalid address ${to}`, false);
  if (!validateERC20(token)) return subheading(`Invalid token ${token}`, false);
  // Error checking
  if (chain === 'btc') return

  const provider = new ethers.providers.JsonRpcProvider(EVM_RPC[chain]);
  const signer = ethers.Wallet.fromMnemonic(mnemonic);
  const wallet = signer.connect(provider);

  // Create the token contract
  const contract = new ethers.Contract(token, ERC20_ABI, wallet);

  // Gets the balance of the token and amount to send in token decimal
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();
  const balance = await contract.balanceOf(wallet.address);
  let value = ethers.utils.parseUnits(amount.toString(), decimals);

  // Calculate the fee
  const gasPrice = await provider.getGasPrice();
  const gasLimit = ethers.utils.hexlify(200000);
  const fee = gasPrice.mul(gasLimit);

  // Check if user has enough ETH to send
  if ((await provider.getBalance(wallet.address)).lt(fee))
    return subheading(`Insufficient ETH balance to send token`, false);

  // Check if the user has enough balance otherwise sends max balance
  if (balance.lt(value)) value = balance;

  try {
    const txid = await contract.transfer(to, value);
    subheading(
      `Sent ${ethers.utils.formatUnits(value.toString(), decimals)} ${symbol} to ${to} with txid ${txid.hash}`,
      true,
    );
  } catch (error) {
    subheading(`Transfer failed ${error}`, false);
  }
};

export const send = async (to: string, chain: Chain, token: string, amount: number, password: string, file: string) => {
  // NOTE not working for some reason
  // if (!Number.isInteger(amount)) return subheading(`Please input a valid amount`, false);

  const mnemonic = await login(password, file);

  if (chain === 'btc') return await sendBtc(mnemonic, to, amount);

  if (token === 'eth' || token === 'bnb' || (chain === 'eth' && !token) || (chain === 'bsc' && !token))
    return await sendEth(mnemonic, chain, to, amount);

  if (chain == 'eth' || chain === 'bsc') return await sendToken(mnemonic, chain, to, token, amount);

  subheading('Invalid chain! Please try again with a valid supported chain.', false);
};
