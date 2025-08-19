const homeController = require('./../controllers/homeController');
const express = require("express");
const router = express.Router();



router.get("/", homeController.index);
router.get("/prueba", homeController.prueba);
router.get("/usuarios/listaUsuarios", homeController.listaUsuarios);
router.get("/usuarios/inicioSesion", homeController.inicioSesion);
router.get("/usuarios/registro", homeController.registro);
module.exports = router;