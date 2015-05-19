var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var pooltaskSchema = new Schema({
  device_id:{ type: String },
  action:   { type: String }
});

module.exports = mongoose.model('pooltask', pooltaskSchema);
