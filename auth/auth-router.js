const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = require('../api/secrets').jwtSecret;
const Users = require('../users/users-model');

// POST - REGISTER
router.post('/register', (req, res) => {
    let credentials = req.body
    const hash = bcrypt.hashSync(credentials.password, 12);
        credentials.password = hash;

  // DB HELPER 
     Users.add(credentials)
     .then (credentials => {
      res.status(201).json(credentials);    
    })
    .catch(error => {
        res.status(500).json({messge: 'this username has been taken'});
      });
  });

  // POST - LOGIN - Register works with token | gives Error 500 when logging in
  router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
  
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token,
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
    
    
    
    // Generate Token
    function generateToken(user) {
        const payload = {
            subject: user.id,
            username: user.username
        };
        const options = {
            expiresIn: 'Id'
        }
        return jwt.sign(payload, secret, options);
    }
        
  
  //   // GET - LOGOUT
  // router.get('/logout', (req, res) => {
  
  //   if(req.session.user) {
  //     req.session.destroy(err => {
  //       if(err) {
  //         res.status(500).json({ message: "Something went wrong"}) //if there is a user but fails to delete the session
  //       } else {
  //         res.status(200).json({ message: "You are now logged out"}) // if it does find the user..
  //       }
  //     });
  //   } else {
  //     res.status(400).json({message: "login required"}) //if it doesn't find the user then this/..
  //   }
  // });



  module.exports = router;