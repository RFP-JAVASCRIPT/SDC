require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database/postgres.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('Serving GET request to "/"')
  db.test((err, data) => {
    console.log(data);
    res.status(200).send(data)
  });
})

app.get('/qa/questions', (req, res) => {
  console.log('Serving GET request for questions');
  const product_id = req.query.product_id;
  const whichPage = req.query.page || 1;
  const count = req.query.count || 5;

  const returnObject = {
    product_id: product_id,
    results: []
  }

  // db.getQuestions(product_id, (err, questions) => {
  //   if (err) {
  //     res.status(200).send(err);
  //   } else {
  //     questions.forEach((question) => {
  //       const question_id = question.id;
  //       question.answers = {};
  //       returnObject.results.push(question)

  //       db.getAnswers(question_id, (err, answers) => {
  //         if (err) {
  //           res.status(200).send(err);
  //         } else {
  //           answers.forEach((answer) => {
  //             const answer_id = answer.id;
  //             answer.photos = [];
  //             question.answers[answer_id] = answer;

  //             db.getPhotos(answer_id, (err, photos) => {
  //               if (err) {
  //                 res.status(200).send(err);
  //               } else {
  //                 photos.forEach((photo) => {
  //                   answer.photos.push(photo.photo_url);
  //                 })
  //               }
  //             })
  //           })
  //         }
  //       })
  //     })
  //     setTimeout(() => res.status(200).send(returnObject), 2000);
  //   }
  // })

  const memoizedQ = {};
  const memoizeA = {};

  db.getQuestions(product_id, (err, data) => {
    if (err) {
      res.status(200).send(err);
    } else {
      data.forEach((datum) => {
        console.log(datum);
      })
      res.status(200).send(data);
    }
  })


})



app.get('/qa/questions/:question_id/answers', (req, res) => {
  console.log('Serving GET request for answers to a question');
  const question_id = req.params.question_id;
  const whichPage = req.query.page || 1;
  const count = req.query.count || 5;
  res.status(200).send('In progress')
})

app.post('/qa/questions', (req, res) => {
  console.log('Serving POST request to add a question');
  const body = req.body.body;
  const name = req.body.name;
  const email = req.body.email;
  const product_id = req.body.prodcut_id;
  res.status(200).send('In progress');
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  console.log('Serving POST request to add an answer');
  const product_id = req.params.question_id;
  const body = req.body.body;
  const name = req.body.name;
  const email = req.body.email;
  const photos = req.body.photos;
  res.status(200).send('In progress');
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  console.log('Serving PUT request to mark a question helpful');
  const product_id = req.params.question_id;
  res.status(200).send('In progress');
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  console.log('Serving PUT request to report a question');
  const product_id = req.params.question_id;
  res.status(200).send('In progress');
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  console.log('Serving PUT request to mark an answer helpful');
  const answer_id = req.params.answer_id;
  res.status(200).send('In progress');
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  console.log('Serving PUT request to report an answer');
  const answer_id = req.params.answer_id;
  res.status(200).send('In progress');
})







app.listen(port, () => {
  console.log(`Server is up and running on port ${port}!`)
})