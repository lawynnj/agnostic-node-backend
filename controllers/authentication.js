const User = require('../models/user');

exports.signup = function(req, res, next){
  const email = req.body.email;
  const passowrd = req.body.password;
  res.send({success: true});
  User.findOne({ email: email }, function(err, existingUser) {
    if(err) return next(err);

    if(existingUser)
      reutn res.status(433).send({ error: 'Email is in use'});
  });
};