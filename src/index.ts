#!/usr/bin/env ts-node

const { Command } = require('commander');
const { balance } = require('./commands/balance');
const { generate } = require('./commands/generate');
const { receive } = require('./commands/receive');
const { send } = require('./commands/send');
const { DEFAULT_PATH } = require('./constants');
const { heading } = require('./utils/log');
const { Chain } = require('./types');

const program = new Command();

heading('hardware-wallet-cli');

program
  .version('1.0.0')
  .name('hardware-wallet-cli')
  .description('CLI for creating, managing and using a pseudo hardware wallet');

// hw generate --password <string> --file <string>(optional)
program
  .command('generate')
  .description('generate a new phrase and encrypt it')
  .requiredOption('-p, --password <string>', 'Password to encrypt the phrase')
  .option('-f, --file <string>', 'File to store the encrypted phrase', DEFAULT_PATH)
  .action(async (options: { password: string; file: string }) => {
    await generate(options.password, options.file);
  });

// hw send --to <address> --chain <Chain> --token <string> (optional) --amount <amount> --password <string> --file <string>(optional)
program
  .command('send')
  .description('sends a token using the hardware wallet to another address')
  .requiredOption('-t, --to <string>', 'Recipient address of the transfer')
  .requiredOption('-c, --chain <Chain>', 'Chain to conduct the transfer on')
  .option('-tk, --token <string>', 'Token to send, not required for native ETH and BTC transfers')
  .requiredOption('-a, --amount <string>', 'Amount of asset to send')
  .requiredOption('-p, --password <string>', 'Password to decrypt the phrase')
  .option('-f, --file <string>', 'File to store the encrypted phrase', DEFAULT_PATH)
  .action(
    async (options: {
      to: string;
      chain: typeof Chain;
      token: string;
      amount: number;
      password: string;
      file: string;
    }) => {
      await send(options.to, options.chain, options.token, options.amount, options.password, options.file);
    },
  );

// hw receive --chain <string>(optional) --password <string> --file <string>(optional)
program
  .command('receive')
  .description('receive a token using the hardware wallet')
  .option('-c, --chain <Chain>', "Chain to receive the tokens, either 'btc' or 'eth'")
  .requiredOption('-p, --password <string>', 'Password to decrypt the phrase')
  .option('-f, --file <string>', 'File to store the encrypted phrase', DEFAULT_PATH)
  .action(async (options: { chain: typeof Chain; password: string; file: string }) => {
    await receive(options.chain, options.password, options.file);
  });

// hw balance --chain <string>(optional) --password <string> --file <string>(optional)
program
  .command('balance')
  .description('check the balance of a token using the hardware wallet')
  .option('-c, --chain <Chain>', "Chain to check available tokens, either 'btc' or 'eth'")
  .requiredOption('-p, --password <string>', 'Password to decrypt the phrase')
  .option('-f, --file <string>', 'File to store the encrypted phrase', DEFAULT_PATH)
  .action(async (options: { chain: typeof Chain; password: string; file: string }) => {
    await balance(options.chain, options.password, options.file);
  });

program.parse();
