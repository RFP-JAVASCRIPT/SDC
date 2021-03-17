const Db = require('pg').Pool;
const db = new Db({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

const test = () => {
  db.connect((err, client, release) => {
    if (err) {
      return console.error(`Can't get client`, err);
    } else {
      console.log('Connected to pool succesfully');
      release()
      console.log('Client released')
    }
  })
}

module.exports = {
  test
}
