const { parentPort, workerData } = require('worker_threads');
const factorial = require('./factorial');

const compute = ({ arr }) => {
  const array = [];
  for (let i = 0; i < 100000000; i++) {
    array.push(i * i);
  }

  return arr.map((el) => factorial(el));
};

parentPort.postMessage(compute(workerData));
