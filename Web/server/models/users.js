var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var usersSchema = new Schema({
  user     :{ type: String },
  password :{ type: String },
  mode     :{ type: String }
});

module.exports = mongoose.model('users', usersSchema);
