var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var beneficiarioSchema = mongoose.Schema({
  ejercicio: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  papellido: {
    type: String,
    required: true
  },
  sapellido: {
    type: String,
    required: true
  },
  sexo: {
    type: String,
    required: true
  },
  genero: {
    type: String,
    required: true
  },
  programa_id: {
    type: Number,
    required: true
  },
  monto: {
    type: Number,
    required: true
  },
  clave_municipio: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  },
  area_id: {
    type: Number,
    required: true
  }
});

beneficiarioSchema.plugin(mongoosePaginate);

var Beneficiario = (module.exports = mongoose.model(
  "beneficiario",
  beneficiarioSchema
));

module.exports.get = function (callback, limit) {
  Beneficiario.find(callback).limit(limit);
};

module.exports.page = function (callback, page, limit) {
  var offset = (page - 1) * limit;
  Beneficiario.paginate({}, { offset: offset, limit: limit }, callback);
};