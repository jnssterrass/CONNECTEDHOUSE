'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DevicesSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Devices', DevicesSchema);