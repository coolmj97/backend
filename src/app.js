require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const app = express();

const { MONGO_URI, GOOGLE_APPLICATION_CREDENTIALS } = process.env;
const PORT = process.env.PORT || 8080;

const serviceAccount = require(GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json()); // JSON 파싱 설정
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 데이터 파싱 설정

// RESTful API route for DB
// const userRouter = require('./routes/user');
const feedRouter = require('./routes/feed');
// const commentRouter = require('./routes/comment');
const s3Router = require('./routes/s3');

// app.use('/users', userRouter);
app.use('/feeds', feedRouter);
// app.use('/comments', commentRouter);
app.use('/upload', s3Router);

// DB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Successfully connected to mongodb'))
  .catch((e) => console.log(e));

// Default route for server status
app.get('/', (req, res) => {
  res.json({ message: `Server is running on port ${PORT}` });
});

const hostname = '0.0.0.0';

// Set listen port for request
app.listen(PORT, hostname);
