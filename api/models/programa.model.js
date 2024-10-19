const { response } = require("express");
var mongoose = require("mongoose");

var programaSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  prefijo: {
    type: String,
    required: true
  },
  nombrecorto: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  responsable: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  nombrecompacto: {
    type: String,
    required: true
  },
  area_id: {
    type: Number,
    required: true
  },
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "area"
  }
});

var Programa = (module.exports = mongoose.model("programa", programaSchema));
module.exports.get = function (callback, limit) {
  Programa.find(callback).limit(limit);
};
