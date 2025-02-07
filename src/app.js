require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const app = express();

const { MONGO_URI } = process.env;
const PORT = process.env.PORT || 8080;

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_ADMIN_SDK_KEY, 'base64').toString('utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true }));

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
app.listen(PORT, hostname, () => {
  console.log(`Server is running on port ${PORT}`);
});
