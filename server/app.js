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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();

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

// Renvoie les requetes dans la console
app.use(morgan('tiny'));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(limiter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);

app.use(express.static(path.join(__dirname, 'build')));

module.exports = app;
