const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our model
const userSchema = new Schema({
  email: { tpye: String, unique: true },
  password: String
});

// create model




// export model