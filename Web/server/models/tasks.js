var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var tasksSchema = new Schema({
  device_id:{ type: Number },
  action:   { type: String }
});

module.exports = mongoose.model('tasks', tasksSchema);
