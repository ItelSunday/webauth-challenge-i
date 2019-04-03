const session = require("express-session");
const KnexSessionStore = require('connect-session-knex')(session);
const configuredKnex = require('../database/dbConfig.js');

module.exports = {
  name: "monster", // session name to increase security
  secret: "It's a secret",
  cookie: {
    maxAge: 1000 * 60 * 10, // milliseconds, 10 min
    secure: false, // use cookie over https (development)
    httpOnly: true // If false, JS can access the cookie on the client
  },
  resave: false, // avoid recreating unchanged sessions
  saveUninitialized: true, // GDPR complicance, if user refuses cookies, then false
  store: new KnexSessionStore({
    knex: configuredKnex,
    tablename: 'session',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 10, // deletes expired sessions every 10 min
  })
}