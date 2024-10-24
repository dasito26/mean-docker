const { path } = require("app-root-path");
var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
//var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Programa = require("./programa.model");
const Municipio = require("./municipio.model");

var beneficiarioSchema = mongoose.Schema({
  ejercicio: {
    type: String,
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
  programa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Programa
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
  municipio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Municipio
  }
});

beneficiarioSchema.plugin(mongoosePaginate);
//beneficiarioSchema.plugin(aggregatePaginate);

var Beneficiario = (module.exports = mongoose.model(
  "beneficiario",
  beneficiarioSchema
));

module.exports.get = function (callback, limit) {
  Beneficiario.find(callback).limit(limit);
};

module.exports.page = function (callback, page, limit, query) {
  var offset = (page - 1) * limit;
  Beneficiario.paginate(
    query,
    {
      offset: offset,
      limit: limit,
      populate: [
        { path: "programa", select: "nombre" },
        { path: "municipio", select: "nombre" }
      ]
    },
    callback
  );
};
