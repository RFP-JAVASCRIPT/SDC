const Db = require('pg').Pool;
const db = new Db({
  user: 'mcvey',
  password: 'drbohr13',
  host: 'localhost',
  database: 'qanda',
  port: 5432,
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
