// Filename: api-routes.js
// Initialize express router
let router = require("express").Router();
// Set default API response
router.get("/", function (req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love!"
  });
});

// Import user controller
var userController = require("./controllers/users.controller");
// user routes
router.route("/users").get(userController.index).post(userController.new);
router
  .route("/user/:user_id")
  .get(userController.view)
  .patch(userController.update)
  .put(userController.update)
  .delete(userController.delete);
router.route("/user/authenticate").post(userController.authenticate);
router
  .route("/user/changepassword/:user_id")
  .put(userController.changePassword);

// Import Contact controller
var contactController = require("./controllers/contact.controller");
// Contact routes
router
  .route("/contacts")
  .get(contactController.index)
  .post(contactController.new);
router
  .route("/contact/:contact_id")
  .get(contactController.view)
  .patch(contactController.update)
  .put(contactController.update)
  .delete(contactController.delete);

// beneficiario routes
var beneficiarioController = require("./controllers/beneficiario.controller");
router.route("/beneficiarios").post(beneficiarioController.index);
router.route("/beneficiarios/:page/:limit").post(beneficiarioController.index);

// Area routes
var catalogosController = require("./controllers/catalogos.controller");
router.route("/areas").post(catalogosController.areas);

// Distrito routes
router.route("/distritos").post(catalogosController.distritos);

// Region routes
router.route("/regiones").post(catalogosController.regiones);

// Programas routes
router.route("/programas").post(catalogosController.programas);
router.route("/programas/:area").post(catalogosController.programasArea);

// Municipios routes
router.route("/municipios").post(catalogosController.municipios);

/*
// Busqueda de beneficiarios
router
  .route("/beneficiarios/:area/:page/:limit")
  .post(beneficiarioController.busquedaSimple);
router
  .route(
    "/beneficiarios/#1/:area/#2/:anio/#3/:programa/#4/:region/#5/:distrito/#6/:municipio/:page/:limit"
  )
  .post(beneficiarioController.busquedaAvanzada);





*/

// Export API routes
module.exports = router;
