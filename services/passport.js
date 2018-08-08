const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization');
};


// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // see if user id in the payload exists in our database
  // if it does call done with that other
  // otherwise call done without a user object
  User.findById(payload.sub, function(err, user) {
    
    // search failed
    if(err) return done(err, false);
    
    if(user) {
      done(null, user);
    } else {
      // couldn't find user
      done(null, false);
    }
  });

});
//Tell passport to use this strategy
