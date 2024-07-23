import axios from 'axios';
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

  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      lang: 'ua, uk',
      units: 'metric',
    },
  });

  return data;
};
