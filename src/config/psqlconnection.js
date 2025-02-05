const { Client } = require('pg');
const client = new Client({
  host: '34.81.244.146',
  port: 5432,
  user: 'root',
  password: 'exevipvl',
  database: 'exe201',
});
const psqlConnection = async () => {
  

  try {
    await client.connect();
    console.log('Connected to PostgreSQL successfully');
  } catch (err) {
    console.error('Failed to connect to PostgreSQL', err);
  }

  return client;
};

module.exports = { psqlConnection,client  };
