const perf_hooks = require('perf_hooks');
const { Worker } = require('worker_threads');

const obs = new perf_hooks.PerformanceObserver((items, observer) => {
  console.log(items.getEntries());
  observer.disconnect();
});
obs.observe({ entryTypes: ['function'] });

const compute = (arr) => {
  return new Promise((res, rej) => {
    const worker = new Worker('./worker.js', {
      workerData: { arr },
    });

    worker.on('message', (msg) => {
      console.log(worker.threadId);
      res(msg);
    });

    worker.on('error', (err) => rej(err));

    worker.on('exit', (code) => {
      if (code !== 0) {
        rej(new Error(`Worker stopped with exit code ${code}`));
      }
      console.log('Worker carried out his task.');
    });
  });
};

const main = async () => {
  try {
    const result = await Promise.all([
      compute([25, 20, 19, 48, 30, 50]),
      compute([25, 20, 19, 48, 30, 50]),
      compute([25, 20, 19, 48, 30, 50]),
      compute([25, 20, 19, 48, 30, 50]),
    ]);

    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
};

const mainObs = perf_hooks.performance.timerify(main);

setTimeout(() => console.log('Our setTimeout fulfilled'));

mainObs();
