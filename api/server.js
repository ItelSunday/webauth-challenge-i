const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//Handler
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// // LOGGER MIDDLEWARE
// server.use(function(req, res, next) {
//     console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  
//     next();
// });

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.use(function(req, res) {
    res.status(404)
    .send("Path does not exist")
});

server.get('/', (req, res) => {
    res.send("Well, it's rendering. It's a good sign.");
  });

  module.exports = server;