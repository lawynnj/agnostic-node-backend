const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOpts = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOpts, function(email, password, done){
  // verify username and password, call done with user

  // if correct username and password
  // else, call done with false
  User.findOne({ email: email }, function(err, user){
    if(err) return done(err);
    if(!user) return done(null, false);
    
    user.comparePassword(password, function(err, isMatch) {
      if(err) return done(err);
      if(!isMatch) return done(null, false);

      return done(null, user);
    });

  })
});
// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};


// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // see if user id in the payload exists in our database

  // if it does call done with that other
  // otherwise call done without a user object
  
  User.findById(payload.sub, function(err, user) {
    
    // search failed
    if(err){
      return done(err, false);
    } 
    
    if(user) {
      done(null, user);
    } else {
      // couldn't find user
      done(null, false);
    }
  });

});
//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);