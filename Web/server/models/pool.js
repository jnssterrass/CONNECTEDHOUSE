var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var poolSchema = new Schema({
  device_id:{ type: String },
  action   :{ type: String }
});

module.exports = mongoose.model('pool', poolSchema);
