#!/usr/bin/env node

import { getArgs } from './helpers/index.js';
import {
  printHelp,
  printSuccess,
  printError,
  saveKeyValue,
  DICTIONARY,
  getWeather,
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

const getForecast = async () => {
  try {
    const weather = await getWeather('Володимир-Волинський');
    console.log(weather);
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
    printHelp();
  }
  if (args.s) {
    // Save city
  }
  if (args.t) {
    saveToken(args.t);
  }

  getForecast();
};

initCLI();
