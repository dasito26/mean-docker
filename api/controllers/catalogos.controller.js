var mongoose = require("mongoose");
Area = require("../models/area.model");
Distritos = require("../models/distrito.model");
Municipios = require("../models/municipio.model");
Programas = require("../models/programa.model");

exports.areas = function (req, res) {
  Area.get(function (err, data) {
    if (err) {
      res.status(400).json({
        status: "error",
        error: "Bad Request."
      });
    } else {
      res.json({
        status: "success",
        message: "Users retrieved successfully",
        data: data
      });
    }
    return null;
  });
};

exports.distritos = function (req, res) {
  Distritos.getDistritos(function (err, data) {
    if (err) {
      res.status(400).json({
        status: "error",
        error: "Bad Request."
      });
    } else {
      data = data.map((item) => parseInt(item));
      data = data.toSorted((a, b) => a - b);
      res.json({
        status: "success",
        message: "Users retrieved successfully",
        data: data
      });
    }
    return null;
  });
};

exports.regiones = function (req, res) {
  Municipios.getRegiones(function (err, data) {
    if (err) {
      res.status(400).json({
        status: "error",
        error: "Bad Request."
      });
    } else {
      res.json({
        status: "success",
        message: "Users retrieved successfully",
        data: data
      });
    }
    return null;
  });
};

exports.programas = function (req, res) {
  Programas.get(function (err, data) {
    if (err) {
      res.status(400).json({
        status: "error",
        error: "Bad Request."
      });
    } else {
      res.json({
        status: "success",
        message: "Users retrieved successfully",
        data: data
      });
    }
    return null;
  });
};

exports.programasArea = function (req, res) {
  // Verificar si el ObjectId es válido
  const { area } = req.params;
  if (!mongoose.Types.ObjectId.isValid(area)) {
    return res.status(400).json({ error: "Invalid area ID" });
  }

  Programas.getProgramasArea(function (err, data) {
    if (err) {
      res.status(400).json({
        status: "error",
        error: "Bad Request."
      });
    } else {
      res.json({
        status: "success",
        message: "Users retrieved successfully",
        data: data
      });
    }
    return null;
  }, area);
};

exports.municipios = function (req, res) {
  if (req.body.distrito && req.body.region) {
    return res.status(400).json({
      status: "error",
      error: "Request Error."
    });
  }

  Municipios.getMunicipiosDistritoRegion(
    function (err, data) {
      if (err) {
        res.status(400).json({
          status: "error",
          error: "Bad Request."
        });
      } else {
        res.json({
          status: "success",
          message: "Users retrieved successfully",
          data: data
        });
      }
      return null;
    },
    req.body.distrito,
    req.body.region
  );
};
