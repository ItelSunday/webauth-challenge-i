const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//const secrets = require('../api/secrets');
const Users = require('../users/users-model');

module.exports = (req, res, next) => {

  const token = req.headers.authorization;
//req.session && req.session.user

    if (token) {
      jwt.verify(token, secrets.jwtSecret, (error,decodedToken) => {
        if(error) {
          res.status(401).json({ message: 'Invalid Credentials'})
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      });
    } else {
        res.status(500).json({ message: 'Server not found'})
    }};