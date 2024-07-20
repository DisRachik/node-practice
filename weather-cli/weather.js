#!/usr/bin/env node

import { getArgs } from './helpers/index.js';
import { printHelp } from './services/index.js';

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    // Display help
    printHelp();
  }
  if (args.s) {
    // Save city
  }
  if (args.t) {
    // Save token
  }

  // Display weather
};

initCLI();
