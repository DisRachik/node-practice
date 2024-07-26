import os from 'os';
import path from 'path';
import { promises as fs } from 'fs';

const FILE_PATH = path.join(os.homedir(), 'weather-data.json');

export const DICTIONARY = {
  token: 'token',
  city: 'city',
};

const isExist = async (pathFile) => {
  try {
    await fs.stat(pathFile);
    return true;
  } catch (e) {
    return false;
  }
};

export const getKeyValue = async (key) => {
  if (await isExist(FILE_PATH)) {
    const file = await fs.readFile(FILE_PATH);
    const data = JSON.parse(file);
    return data[key];
  }
  return null;
};

export const saveKeyValue = async (key, value) => {
  let data = {};

  if (await isExist(FILE_PATH)) {
    const file = await fs.readFile(FILE_PATH);
    data = JSON.parse(file);
  }

  data[key] = value;

  await fs.writeFile(FILE_PATH, JSON.stringify(data));
};
