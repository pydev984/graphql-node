var mongoose = require('mongoose');

var ProjectsSchema = new mongoose.Schema({
  user_id: String,
  project_name: String,
  total_budget: String,
  deadline: Date,
});

module.exports = mongoose.model('Project', ProjectsSchema);