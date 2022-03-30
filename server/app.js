const express = require('express');
// Path module has many useful properties and methods to access and manipulate paths in the file system.
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

// const publicPath = path.join(__dirname, '..', 'public');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();

// const corsOptions = {
//   origin: '*',
//   credentials: true,
//   'allowedHeaders': ['sessionId', 'Content-Type'],
//   'exposedHeaders': ['sessionId'],
//   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   'preflightContinue': false,
//   'Access-Control-Allow-Credentials': true,
// };

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(
  '/uploads/images',
  express.static(path.join(__dirname, '/uploads/images'))
);
app.use(
  '/uploads/avatars',
  express.static(path.join(__dirname, '/uploads/avatars'))
);
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);

// Renvoie les requetes dans la console
app.use(morgan('tiny'));

app.use(limiter);

// app.use(express.static(publicPath));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index.html'));
// });
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;
