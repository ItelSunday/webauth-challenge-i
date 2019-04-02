const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const encrypt = require('bcrypt.js');

const server = express();

// const db = require('./database/dbConfig.js');

server.use(helmet());
server.use(express.json());
server.use(cors());

// Middleware
server.use(function(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);

  next();
})

// Endpoints
server.get("/", (req, res) => {
    res.send('Welcome Auth Traveler!');
  });

server.post('/api/register', (req, res) => {
    let user = req.body
});

server.post('/api/login', (req, res) => {
    let {username, password} = req.body;
});

server.get('/api/users', (req, res) => {
    
});


// Error
server.use(function(req, res) {
    res
    .status(404)
    .send("Directory does not exist");
  });

  module.exports = server.js;