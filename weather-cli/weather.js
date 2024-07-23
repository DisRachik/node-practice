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

  // Display weather
  getWeather('Київ');
};

initCLI();
