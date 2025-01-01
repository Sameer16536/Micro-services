const app = require('./app');
require('dotenv').config();
require('./db/db');

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Ride service running on port ${PORT}`);
}); 