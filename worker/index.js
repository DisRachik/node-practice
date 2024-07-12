const perf_hooks = require('perf_hooks');
const factorial = require('./factorial');

const obs = new perf_hooks.PerformanceObserver((items, observer) => {
  console.log(items.getEntries());
  observer.disconnect();
});
obs.observe({ entryTypes: ['function'] });

const compute = (arr) => {
  const array = [];
  for (let i = 0; i < 100000000; i++) {
    array.push(i * i);
  }

  return arr.map((el) => factorial(el));
};

const main = () => {
  const result = [
    compute([25, 20, 19, 48, 30, 50]),
    compute([25, 20, 19, 48, 30, 50]),
    compute([25, 20, 19, 48, 30, 50]),
    compute([25, 20, 19, 48, 30, 50]),
  ];

  console.log(result);
};

const mainObs = perf_hooks.performance.timerify(main);

setTimeout(() => console.log('Our setTimeout fulfilled'));

mainObs();
