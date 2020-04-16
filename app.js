var express=require("express");
var app=express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

if(process.env.ENV === 'Test'){
  console.log('This is a test');
  console.log(process.env.ENV);
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
}else{
  console.log('this for real');
  console.log(process.env.ENV);
   const db = mongoose.connect('mongodb://localhost/bookAPI-prod');

}

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get("/",function(req, res){
  res.send("you are at home page");
});

app.listen(3000,function(){
  console.log("server has started");
});

module.exports = app;