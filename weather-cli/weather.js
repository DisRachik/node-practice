#!/usr/bin/env node

import { getArgs } from './helpers/index.js';
import {
  printHelp,
  printSuccess,
  printError,
  saveKeyValue,
  DICTIONARY,
  getWeather,
  printWeather,
  getKeyValue,
  getIcon,
} from './services/index.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('No token passed');
    return;
  }

  try {
    await saveKeyValue(DICTIONARY.token, token);
    printSuccess('Token saved');
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError('No named city passed');
    return;
  }

  try {
    await saveKeyValue(DICTIONARY.city, city);
    printSuccess('City saved');
  } catch (e) {
    printError(e.message);
  }
};

const getForecast = async () => {
  try {
    const city = process.env.city ?? (await getKeyValue(DICTIONARY.city));
    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (e) {
    if (e?.response?.status === 404) {
      printError('The city was given incorrectly.');
    } else if (e?.response?.status === 401) {
      printError('The token was given incorrectly.');
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }

  getForecast();
};

initCLI();
