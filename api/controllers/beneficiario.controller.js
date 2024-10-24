// userController.js
// Import user model
Beneficiario = require("../models/beneficiario.model");
Municipio = require("../models/municipio.model");
Programa = require("../models/programa.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
// Handle index actions

exports.index = async function (req, res) {
  const page = req.params.page ?? 1;
  const limit = req.params.limit ?? 10;

  // Trabajar el body
  var query = {};

  //programa y area
  if (req.body.area != "" && req.body.programa == "") {
    const programas = await Programa.find({ area: req.body.area });
    query.programa = { $in: programas.map((p) => p._id) };
  } else if (req.body.programa != "") {
    query.programa = req.body.programa;
  }

  if (req.body.distrito != "" && req.body.region != "") {
    return res.status(400).json({
      status: "error",
      error: "Bad Request."
    });
  }

  //distrito y municipio
  if (req.body.distrito != "" && req.body.municipio == "") {
    if (req.body.distrito == "29") {
      query.municipio = "6717ee3070e93cbcef82c128";
    } else if (req.body.distrito == "11") {
      query.municipio = "6717ee3070e93cbcef82c1c0";
    } else if (req.body.distrito == "15") {
      query.municipio = "6717ee3070e93cbcef82c1be";
    } else {
      const municipios = await Municipio.find({ distrito: req.body.distrito });
      query.municipio = { $in: municipios.map((m) => m._id) };
    }
  } else if (req.body.municipio != "") {
    query.municipio = req.body.municipio;
  }

  //region
  if (req.body.region != "" && req.body.municipio == "") {
    const regiones = await Municipio.find({ region: req.body.region });
    query.municipio = { $in: regiones.map((p) => p._id) };
  } else if (req.body.municipio != "") {
    query.municipio = req.body.municipio;
  }

  //anio
  if (req.body.anio != "") {
    query.ejercicio = req.body.anio;
  }

  Beneficiario.page(
    function (err, beneficiarios) {
      if (err) {
        res.status(400).json({
          status: "error",
          error: "Bad Request."
        });
      } else {
        res.json({
          status: "success",
          message: "Users retrieved successfully",
          data: beneficiarios
        });
      }
    },
    page,
    limit,
    query
  );
};

/*
// Handle create user actions
exports.new = function (req, res) {
  User.find({ username: req.body.username.trim() }, function (err, users) {
    if (err) {
      res.status(400).json({
        status: "error",
        message: err
      });
    }
    if (users && users.length > 0) {
      res.status(400).send({
        status: "error",
        message: req.body.username + " is already taken"
      });
    } else {
      var user = new User();
      user.username = req.body.username;
      user.email = req.body.username;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10);
      }
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      // save the user and check for errors
      user.save(function (err) {
        if (err) {
          res.status(400).json({
            status: "error",
            error: err
          });
        }
        res.json({
          message: "New user created!",
          data: user
        });
      });
    }
  });
};
// Handle view user info
exports.view = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      res.status(400).json({
        status: "error",
        error: err
      });
    }
    res.json({
      message: "User details loading..",
      data: user
    });
  });
};
// Handle update user info
exports.update = function (req, res) {
  User.findByIdAndUpdate(
    req.params.user_id,
    req.body,
    { new: true },
    function (err, user) {
      if (err) {
        res.status(400).json({
          status: "error",
          error: err
        });
      }

      res.json({
        message: "User Info updated",
        data: user
      });
    }
  );
};
// Handle delete user
exports.delete = function (req, res) {
  User.remove(
    {
      _id: req.params.user_id
    },
    function (err, user) {
      if (err) {
        res.status(400).json({
          status: "error",
          error: err
        });
      }
      res.json({
        status: "success",
        message: "User deleted"
      });
    }
  );
};

exports.authenticate = function (req, res) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      res.status(400).json({
        status: "error",
        error: err
      });
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      // authentication successful
      user.token = jwt.sign({ sub: user._id }, environment.secret, {
        algorithm: "HS256"
      });
      delete user.password;
      res.json({
        status: "success",
        message: "Users retrieved successfully",
        data: user
      });
    } else {
      // authentication failed
      res.status(401).send({
        status: "error",
        message: "User name or password is invalid."
      });
    }
  });
};

exports.changePassword = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      res.status(400).json({
        status: "error",
        error: err
      });
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      // authentication successful
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10);
      }
      user.save(function (err) {
        if (err) res.json(err);
        res.status(202).send({
          status: "success",
          message: "Password Updated successfully"
        });
      });
    } else {
      // authentication failed
      res.status(401).send({
        status: "error",
        message: "Old password is wrong."
      });
    }
  });
};
*/
