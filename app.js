const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

const db = mongoose.connect('mongodb://localhost/bookAPI',{
  useUnifiedTopology: true,
  useNewUrlParser: true
});
// testing integration
// if(process.env.NODE_ENV == 'Test'){
//   console.log('This is a test');
//   console.log(process.env.ENV);
//   const db = mongoose.connect('mongodb://localhost/bookAPI_Test', {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
//   });
// }else{
//   console.log('this for real');
//    const db = mongoose.connect('mongodb://localhost/bookAPI-prod',
//    {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
//    });

// }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('you are at home page');
});

app.listen(3000, () => {
  // console.log('server has started');
});

module.exports = app;
