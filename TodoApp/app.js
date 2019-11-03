const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
//middleware 
app.use(express.json());
// app.use((req,res,next) => {
//   console.info('HELLO : ', req);
//   next();
// })

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers','X-Requested-With,Content-Type');
  console.info('HELLO : ', req.method);
  console.info('HELLO : ', req.body);
  next();
});
//routes
const todoRoute = require('./routes/todos');


app.use('/api/todos', todoRoute);
app.get('/', (req, res) => {
  res.send('this is home');
});


//connect to database

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to database')
);

const port = process.env.PORT || 57602;
app.listen(port, () => {
  console.log(`server started on port ${port} `);
});
