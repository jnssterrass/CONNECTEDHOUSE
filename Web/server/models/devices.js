var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var devicesSchema = new Schema({
  name:     { type: String },
  device_id:{ type: Number },
  address:  { type: String },
  status:   { type: String }
});

module.exports = mongoose.model('devices', devicesSchema);
