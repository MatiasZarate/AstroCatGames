const homeController = require('./../controllers/homeController');
const express = require("express");
const router = express.Router();
const multer = require("multer")
const upload = multer({ dest: "uploads/" });

const path = require("path");
const {check} = require('express-validator');


const validateRegister = [
    check("nombre")
    .notEmpty().withMessage("debes completar el nombre de usuario")
    .isLength({min:4, max:13}).withMessage("no debe tener menos de 4 o más de 13 caracteres"),
    check("password").notEmpty().withMessage("debes completar la contraseña"),
    check("email").notEmpty() .withMessage("debes completar el campo con un email"),
    check("edad").notEmpty().withMessage("debes completar el campo edad")
];

const uploadFile = multer();
 
router.get("/", homeController.index);
router.get("/prueba", homeController.prueba);
router.get("/usuarios/listaUsuarios", homeController.listaUsuarios);
router.delete("/usuarios/delete/:id", homeController.deleteUsuario);
router.get("/usuarios/inicioSesion", homeController.inicioSesion);
router.get("/usuarios/registro", homeController.registro); 
router.post("/usuarios/registro", upload.single('imagen'), validateRegister, homeController.postregistro);
router.get("/usuarios/editar/:id", homeController.editar);
router.put("/usuarios/editar/:id", upload.single("imagen"), homeController.editar2);

module.exports = router; 