var mongoose = require("mongoose");

var areaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  nombrecompleto: {
    type: String,
    required: true
  },
  secretaria: {
    type: String,
    required: true
  },
  comentarios: {
    type: String,
    required: true
  },
  prefijo: {
    type: String,
    required: true
  }
});

var Area = (module.exports = mongoose.model("area", areaSchema));
module.exports.get = function (callback, limit) {
  Area.find(callback).limit(limit);
};
