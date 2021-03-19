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
      client.query('select q.id AS question_id, q.body AS question_body, q.date_written AS question_date, q.asker_name, q.helpful AS question_helpfulness, q.reported, a.id, a.body, a.date_written AS date, a.answerer_name, a.helpful AS helpfulness, p.photo_url from questions q left join answers a on (q.id = a.question_id) left join photos p on (a.id = p.answer_id) where q.product_id = 1 order by q.id ASC', (err, result) => {
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

const getQuestions = (productId, callback) => {
  db.connect((err, client, release) => {
    if (err) {
      return callback(err, null);
    } else {
      const sql = `select q.id AS question_id, q.body AS question_body, q.date_written AS question_date, q.asker_name, q.helpful AS question_helpfulness, q.reported, a.id, a.body, a.date_written AS date, a.answerer_name, a.helpful AS helpfulness, a.reported AS answer_reported, p.photo_url from questions q left join answers a on (q.id = a.question_id) left join photos p on (a.id = p.answer_id) where q.product_id = ${productId} order by q.id ASC`;
      client.query(sql, (err, result) => {
        release();
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, result.rows);
        }
      })
    }
  })
}

const getAnswers = (questionId, callback) => {
  db.connect((err, client, release) => {
    if (err) {
      return callback(err, null);
    } else {
      const sql = `select a.id, a.body, a.date_written AS date, a.answerer_name, a.helpful AS helpfulness, a.reported AS answer_reported, p.photo_url, p.id AS photo_id from answers a left join photos p on (a.id = p.answer_id) where a.question_id = ${questionId} order by a.id ASC`;
      client.query(sql, (err, result) => {
        release();
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, result.rows);
        }
      })
    }
  })
}

const getPhotos = (answerId, callback) => {
  db.connect((err, client, release) => {
    if (err) {
      return callback(err, null);
    } else {
      const sql = `SELECT * FROM photos WHERE answer_id = ${answerId}`;
      client.query(sql, (err, result) => {
        release();
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
  test,
  getQuestions,
  getAnswers,
  getPhotos
}
