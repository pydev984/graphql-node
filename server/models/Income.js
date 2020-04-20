var mongoose = require('mongoose');

var IncomeSchema = new mongoose.Schema({
  project_id: String,
  user_id: String,
  income: String,
  date: Date,
});

module.exports = mongoose.model('Income', IncomeSchema);