process.on('message', (msg) => {
  if (msg === 'disconnect') {
    process.disconnect();
    return;
  }

  console.log(`Child process received ${msg}`);
  process.send('Pong!');
});
