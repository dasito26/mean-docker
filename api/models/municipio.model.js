var mongoose = require("mongoose");

var municipioSchema = mongoose.Schema({
  cve_edo: {
    type: String,
    required: true
  },
  cve_mpio: {
    type: String,
    required: true
  },
  cve_mpio_full: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  territorio: {
    type: Number,
    required: true
  },
  zap_rural: {
    type: String,
    required: true
  },
  gdo_marginacion: {
    type: String,
    required: true
  },
  zona: {
    type: String,
    required: true
  },
  itsmo: {
    type: Number,
    required: true
  },
  region: {
    type: String,
    required: true
  }
});

var Municipio = (module.exports = mongoose.model("municipio", municipioSchema));
module.exports.get = function (callback, limit) {
  Municipio.find(callback).limit(limit);
};
