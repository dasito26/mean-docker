var mongoose = require("mongoose");

var distritoSchema = mongoose.Schema({
  cve_mpio_full: {
    type: String,
    required: true
  },
  cve_mpio: {
    type: String,
    required: true
  },
  distrito: {
    type: Number,
    required: true
  },
  cabecera: {
    type: Number,
    required: true
  }
});

var Distrito = (module.exports = mongoose.model("distrito", distritoSchema));
module.exports.get = function (callback, limit) {
  Distrito.find(callback).limit(limit);
};
