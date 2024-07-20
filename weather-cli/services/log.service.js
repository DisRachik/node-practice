import chalk from 'chalk';
import dedent from 'dedent-js';

export const printError = (err) => {
  console.log(`${chalk.bgRed(' ERROR ')} ${err}`);
};

export const printSuccess = (msg) => {
  console.log(`${chalk.bgGreen(' SUCCESS ')} ${msg}`);
};

export const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(' HELP ')}
    Without parameters - will be displayed weather forecast;
    flag ${chalk.bold.yellow('-s')} ${chalk.italic('[CITY]')} - will be set transferred city;
    flag ${chalk.bold.yellow('-h')} - will be displayed helping;
    flag ${chalk.bold.yellow('-t')} ${chalk.italic('[API_KEY]')} - will be saved the token.
    `
  );
};
