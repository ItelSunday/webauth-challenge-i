const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

// POST - REGISTER
router.post('/register', async (req, res) => {
    let credentials = req.body

  // DB HELPER
  try {
    if (credentials.username && credentials.password) {
        const hash = encrypt.hashSync(credentials.password, 12);
        credentials.password = hash;

        const newUsers = await Users.add(credentials);
      res.status(201).json(credentials);
    } else {
        res.status(400).json({ error: "Please include a username and password" }) 
      }
    } catch (error) {
      res.status(500).json({messge: 'this username has been taken'});
    }

  });
  // POST - LOGIN
router.post('/api/login', async (req, res) => {
    let {username, password} = req.body;

    try {
        if (username && password) {
          const user = await Users.findBy({ username: username });

          if (user && encrypt.compareSync(password, user.password)) 
          {req.session.user = user;
            res.status(200).json({ message: `Welcome ${user.username}`});
          } else {
            res.status(401).jason({ message: "Invalid credentials"})
          }
        } else {
          res.status(400).json({ error: "username and password required." }) 
        }
      } catch (error) {
        res.status(500).json(error);
      }
    });
  
  router.get('/logout', (req, res) => {
  
    if(req.session.user) {
      req.session.destroy(err => {
        if(err) {
          res.status(500).json({ message: "Something went wrong"}) //if there is a user but fails to delete the session
        } else {
          res.status(200).json({ message: "You are now logged out"}) // if it does find the user..
        }
      });
    } else {
      res.status(400).json({message: "login required"}) //if it doesn't find the user then this/..
    }
  });



  module.exports = router;