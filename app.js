const { exec, spawn } = require('child_process');

const childProcess = exec('ls', (err, stdout, stderr) => {
  if (err) {
    console.error(err.message);
  }

  console.log('stdout with exec: ', stdout);
  console.log('stderr with exec: ', stderr);
});

const child_process2 = spawn('ls', ['-la']);

child_process2.stdout.on('data', (data) => console.log('stdout with spawn: ', data.toString()));
child_process2.stderr.on('data', (data) => console.log('stdout with spawn: ', data.toString()));
