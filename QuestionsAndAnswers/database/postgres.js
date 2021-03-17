const Db = require('pg').Pool;
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;
const db = new Db({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_DATABASE,
  port: DB_PORT,
});

const test = (callback) => {
  db.connect((err, client, release) => {
    if (err) {
      return console.error(`Can't get client`, err);
    } else {
      client.query('SELECT * FROM questions WHERE id < 4', (err, result) => {
        release()
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, result.rows);
        }
      })
    }
  })
}

module.exports = {
  test
}
