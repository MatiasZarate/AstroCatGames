const homeController = require('./../controllers/homeController');
const express = require("express");
const router = express.Router();
const multer = require("multer") /*para subir imagenes */
const upload = multer({ dest: "uploads/" });

const path = require("path");
const {check} = require('express-validator'); /*para validar */
const { or } = require('sequelize'); /*no lo usé, lol */

/*validaciones backend */
const validateRegister = [
    check("nombre")
    .notEmpty().withMessage("debes completar el nombre de usuario")
    .isLength({min:4, max:12}).withMessage("no debe tener menos de 4 o más de 13 caracteres"),
    check("password").notEmpty().withMessage("debes completar la contraseña"),
    check("email").notEmpty() .withMessage("debes completar el campo con un email"),
    check("edad").notEmpty().withMessage("debes completar el campo edad")
];
const validateRegister2 = [
    check("nombre")
    .notEmpty().withMessage("debes completar el nombre del producto")
    .isLength({min:3, max:12}).withMessage("no debe tener menos de 3 o más de 12 caracteres"),
    check("descripcion").notEmpty().withMessage("debes completar la descripción"),
    check("precio").notEmpty() .withMessage("debes completar el campo de precio"),
    check("cantidad").notEmpty()
    .isLength({min:1}).withMessage("no puede ser menor de 1"),
    check("categoria").notEmpty().withMessage("debes seleccionar una categoria")
];
/*funciones para middlewares */
function admin (req, res, next){
  if(req.session.userLogged && req.session.userLogged.admin === true){
        next();
        }else{
         res.redirect("/")
        }
}
function session(req, res, next){
  if(req.session.userLogged ){
        next();
        }else{
         res.redirect("/")
        }
}
function sessionPerfil(req, res, next){ /*function para verificar loggeo */
  const user = req.session.userLogged

        if(!user){
         res.redirect("/")
        }
        if(user.id == req.params.id || user.admin === true){
        next();
        }else{
         res.redirect("/")
        }
}
function editar(req, res, next){
  const user = req.session.userLogged

        if(!user){
         res.redirect("/")
        }
        if(user.id == req.params.id){
        next();
        }else{
         res.redirect("/")
        }
}

const uploadFile = multer();
 
router.get("/", homeController.index);
router.get("/prueba", homeController.prueba);

/*usuarios */
router.get("/usuarios/inicioSesion", homeController.inicioSesion);
router.post("/usuarios/inicioSesion", homeController.inicioSesionDos);
router.get("/usuarios/listaUsuarios", admin, homeController.listaUsuarios);
router.get("/usuarios/perfil/:id", sessionPerfil, homeController.perfil);
router.delete("/usuarios/delete/:id", homeController.deleteUsuario); 
router.get("/logout", homeController.logOut)
router.get("/usuarios/registro", homeController.registro); 
router.post("/usuarios/registro", upload.single('imagen'), validateRegister, homeController.postregistro);
router.get("/usuarios/editar/:id", editar, homeController.editar);
router.put("/usuarios/editar/:id", upload.single("imagen"), homeController.editar2);
/*router.put('/toggleAdmin/:id', homeController.toggleAdmin);*/

/*productos */
router.get("/productos/creaProducto", admin, homeController.creaProducto);
router.post("/productos/creaProducto", upload.single('imagen'), validateRegister2, homeController.postCreaProducto);
router.get("/productos/detalleProducto/:id", homeController.detalleProducto);
router.delete("/productos/delete/:id", homeController.deleteProducto);
router.get("/productos/editarProducto/:id", homeController.editarProducto);
router.put("/productos/editarProducto/:id", upload.single('imagen'), homeController.editarProducto2);
router.get("/productos/oferta/:id", homeController.oferta);
router.put("/productos/oferta/:id", homeController.oferta2);
router.get("/categorias/videojuegos", homeController.videojuegos);
router.get("/categorias/consolas", homeController.consolas);
router.get("/categorias/accesorios", homeController.accesorios);
router.get("/categorias/merch", homeController.merch);
router.get("/categorias/packs", homeController.packs);
router.get("/productos/tarjeta", homeController.tarjeta)
router.delete("/productos/oferta/delete/:id", homeController.deleteOferta);

/*carrito */
router.post("/agregar", homeController.agregarProducto);/*posible relleno */
router.get("/carrito", homeController.verCarrito);
router.post("/eliminar", homeController.eliminarProducto);
router.get("/finalizar", homeController.finalizarCarrito);

module.exports = router; 