const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const server = express();

const db = require('./database/dbConfig.js');

server.use(helmet());
server.use(express.json());
server.use(cors());

// Middleware
server.use(function(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);

  next();
})

// Endpoints

// GET
server.get("/", (req, res) => {
    res.send('Welcome Auth Traveler!');
  });

// POST - REGISTER
server.post('/api/register', (req, res) => {
    let credentials = req.body

      // DB HELPER (Users.add(user))
  const hash = encrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  // DB HELPER (Users.add(user))
  try {
    if (credentials.username && credentials.password) {
      // const newUser = await Users.add(credentials);
      res.status(201).json(credentials);
    } else {
        res.status(400).json({ error: "Please include a username and password" }) 
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });
  // POST - LOGIN
server.post('/api/login', (req, res) => {
    let {username, password} = req.body;

    try {
        if (username && password) {
          // const user = await Users.findBy({ username });
          if (user && encrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}`});
          } else {
            res.status(401).jason({ message: "Invalid credentials"})
          }
        } else {
          res.status(400).json({ error: "Please include a username and password." }) 
        }
      } catch (error) {
        res.status(500).json(error);
      }
    });

    // GET - REGISTER
server.get("/api/users", restricted, async (req, res) => {
    try {
      const users = await Users.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  // AUTHORIZATION MIDDLEWARE
function restricted(req, res, next) {
    const { username, password } = req.headers;
  
    if (username && password) {
      Users.findBy({ username })
        .first()
        .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
            next();
          } else {
            res.status(401).jason({ message: "Invalid credentials" });
          }
        })
        .catch(error => {
          res.status(500).json(error);
        });
    } else {
      res.status(401).json({ error: "Please include a username and password" });
    }
  }
  

// Error
server.use(function(req, res) {
    res
    .status(404)
    .send("Directory does not exist");
  });

module.exports = server;