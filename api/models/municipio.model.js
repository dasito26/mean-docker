var mongoose = require("mongoose");
Distrito = require("../models/distrito.model");

var municipioSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
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

module.exports.getRegiones = function (callback) {
  Municipio.distinct("region", callback);
};

module.exports.getMunicipiosDistritoRegion = function (
  callback,
  distrito,
  region
) {
  if (distrito == null && region == null) {
    Municipio.find(callback);
  } else if (distrito == null) {
    Municipio.find(
      {
        region: region
      },
      callback
    );
  } else {
    Distrito.find({
      distrito: distrito.toString()
    }).then((distritos) => {
      let municipios = distritos.map((item) => item.municipio);
      Municipio.find(
        {
          _id: {
            $in: municipios
          }
        },
        callback
      );
    });
  }
};
