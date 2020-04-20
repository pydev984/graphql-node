var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  user_name: String,
  user_birthday: Date,
});

module.exports = mongoose.model('User', UserSchema);