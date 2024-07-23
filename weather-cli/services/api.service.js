import https from 'https';
import chalk from 'chalk';
import { DICTIONARY, getKeyValue } from './index.js';

export const getWeather = async (city) => {
  const token = await getKeyValue(DICTIONARY.token);
  if (!token) {
    throw new Error(
      `You haven't set API yet. Please, you might set it up using the command with flag
      ${chalk.bold.yellow('-t')} ${chalk.italic('[API_KEY]')}.`
    );
  }

  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.searchParams.append('q', city);
  url.searchParams.append('appid', token);
  url.searchParams.append('units', 'metric');

  https.get(url, (response) => {
    let res = '';

    response.on('data', (chunk) => {
      res += chunk;
    });

    response.on('end', () => console.log(res));
  });
};
