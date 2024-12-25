const autocannon = require('autocannon');

const run = () => {
  const url = 'http://localhost:3000';

  const instance = autocannon(
    {
      url,
      connections: 100, // Number of connections
      duration: 30,      // Duration of the test in seconds
    },
    (err, result) => {
      if (err) {
        console.error('Error running autocannon:', err);
      } else {
        console.log('Test completed');
        console.log(result);
      }
    }
  );

  autocannon.track(instance, { renderProgressBar: true });

  instance.on('done', () => {
    console.log('Load test finished');
  });
};

run();
