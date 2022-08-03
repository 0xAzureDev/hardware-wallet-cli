import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

export const heading = (text: string) => {
  clear();
  console.log(chalk.red(figlet.textSync(text, { horizontalLayout: 'full' })));
};

export const subheading = (text: string, success: boolean) => {
  if (success) console.log(chalk.black.bold.bgGreenBright(text));
  else console.log(chalk.black.bold.bgRedBright(text));
};

export const body = (text: string) => {
  console.log(chalk.white.bold(text));
};

/**
export const divider = () => {
  console.log(chalk.black.bold.bgWhite('----------------------------------------------------'));
};
 */
