# Hardware Wallet CLI

CLI for creating, managing and using a pseudo hardware wallet

## Table of Contents

- [Hardware Wallet CLI](#hardware-wallet-cli)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [How to install](#how-to-install)
  - [Supported arguments and commands](#supported-arguments-and-commands)
    - [Usage](#usage)
    - [Help Usage](#help-usage)
    - [Available Commands](#available-commands)
      - [Help](#help)
      - [Generate](#generate)
      - [Send](#send)
      - [Receive](#receive)
      - [Balance](#balance)
  - [Contributing](#contributing)
  - [License](#license)

## About

Hardware Wallet CLI provides a flexible set of commands for users to create, manage, send and receive using a pseudo hardware wallet. Akin to a Ledger device, this CLI gives you the necessary commands to interact with a hardware wallet without the need to purchase an overrated and expensive device to manage an encrypted wallet.

## How to install

You can install the CLI with the following command:

```bash
npm install hardware-wallet-cli
```

or

```bash
yarn add hardware-wallet-cli
```

## Supported arguments and commands

### Usage

All interactions with hardware-wallet-cli are of the form

```bash
hardware-wallet-cli [command] [options]
```

If no command is specified then the help command is used by default

### Help Usage

To display basic commands and arguments -

```bash
hardware-wallet-cli --help
```

### Available Commands

#### Help

Access the help menu for the CLI

`$ hardware-wallet-cli help`

```bash
$ hardware-wallet-cli help

CLI for creating, managing and using a pseudo hardware wallet

Options:
  -V, --version       output the version number
  -h, --help          display help for command

Commands:
  generate [options]  generate a new phrase and encrypt it
  send [options]      sends a token using the hardware wallet to another address
  receive [options]   receive a token using the hardware wallet
  balance [options]   check the balance of a token using the hardware wallet
  help [command]      display help for command
```

#### Generate

Generate a new phrase and encrypt it:\
`$ hardware-wallet-cli generate --password <string> --file <string>(optional)`

```bash
$ hardware-wallet-cli generate [options]

generate a new phrase and encrypt it

Options:
  -p, --password <string>  Password to encrypt the phrase
  -f, --file <string>      File to store the encrypted phrase (default: $CWD)
  -h, --help               display help for command
  ```

#### Send

Sends a token using the hardware wallet to another address:\
`$ hardware-wallet-cli send --to <address> --chain <Chain> --token <string> (optional) --amount <amount> --password <string> --file <string>(optional)`

```bash
$ hardware-wallet-cli send [options]

sends a token using the hardware wallet to another address

Options:
  -t, --to <string>        Recipient address of the transfer
  -c, --chain <Chain>      Chain to conduct the transfer on
  -tk, --token <string>    Token to send, not required for native ETH and BTC transfers
  -a, --amount <string>    Amount of asset to send
  -p, --password <string>  Password to decrypt the phrase
  -f, --file <string>      File to store the encrypted phrase (default: $CWD)
  -h, --help               display help for command
```

#### Receive

Receive a token using the hardware wallet:\
`$ hardware-wallet-cli receive --chain <string>(optional) --password <string> --file <string>(optional)`

```bash
$ hardware-wallet-cli receive [options]

receive a token using the hardware wallet

Options:
  -c, --chain <Chain>      Chain to receive the tokens, either 'btc' or 'eth' or 'bsc'
  -p, --password <string>  Password to decrypt the phrase
  -f, --file <string>      File to store the encrypted phrase (default: CWD)
  -h, --help               display help for command
```

#### Balance

Balance a token using the hardware wallet:\
`$ hardware-wallet-cli balance --chain <string>(optional) --password <string> --file <string>(optional)`

```bash
$ hardware-wallet-cli balance [options]

check the balance of a token using the hardware wallet

Options:
  -c, --chain <Chain>      Chain to check available tokens, either 'btc' or 'eth' or 'bsc'
  -p, --password <string>  Password to decrypt the phrase
  -f, --file <string>      File to store the encrypted phrase (default: $CWD)
  -h, --help               display help for command
```

## Contributing

1. Fork it (<https://github.com/0xAzureDev/hardware-wallet-cli/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'feat: some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

Distributed under the `MIT` License. See `LICENSE` for more information.
LicenseContributing
