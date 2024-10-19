var mongoose = require("mongoose");

var distritoSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
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
  },
  municipio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "municipio"
  }
});

var Distrito = (module.exports = mongoose.model("distrito", distritoSchema));
module.exports.get = function (callback, limit) {
  Distrito.find(callback).limit(limit);
};
