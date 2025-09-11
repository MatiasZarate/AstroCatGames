const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
/*let db = require("../database/models");*/
let db = require("../database/models");

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

          
cloudinary.config({
  cloud_name: "dduyxqrqt",
  api_key: "867588739315874",
  api_secret: "meBOrwZzq5JG1CZJmut8pqVFtT0",
  debug: true
});
const mysql = require("mysql");

/*let conexion = mysql.createConnection({
    host:"localhost", 
    database:"astrocatgames",
    user:"root",
    password:"" 
})*/

const controlador = {
    index: async(req, res) => {/*(req,res)=>{
        res.render("index")
    }*/ try{
        const listaProductos = await db.productos.findAll({
    order: [['id', 'DESC']]   
    });
        res.render("index", {listaProductos})
    }catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al obtener los datos de la base de datos");
    }},
    prueba: (req, res) =>{
        res.render("prueba") /**/ 
    },
    listaUsuarios: async(req, res) =>{
        try{
            const listado = await db.usuarios.findAll();
            res.render("usuarios/listaUsuarios", { listado })
        }catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al obtener los datos de la base de datos");
        }
    },
    deleteUsuario: async(req, res)=>{
        try{
            const deleteUsuario = await db.usuarios.findByPk(req.params.id);

        if(deleteUsuario){
            await deleteUsuario.destroy();
            res.redirect("/usuarios/listaUsuarios");
        }} catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al eliminar los datos de la base de datos");
        }
    },
    inicioSesion: (req, res) =>{
        res.render("usuarios/inicioSesion") 
    },
    registro: (req, res) =>{
        res.render("usuarios/registro")
    },
    postregistro: async (req, res) => {
         let errors = validationResult(req);
          
           if (!errors.isEmpty()){
            return res.render("usuarios/registro", { errors: errors.array() })
           }
                
                try { 
                let hashedPassword = bcrypt.hashSync(req.body.password, 10);
                let imagen = 'https://res.cloudinary.com/dduyxqrqt/image/upload/v1755726525/pfpDefault_nia0sd.jpg';


      if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
        imagen = result.secure_url;
      }

            const { nombre, email, edad } = req.body;
                
            await db.usuarios.create({
                nombre,
                password: hashedPassword,
                email,
                edad,
                imagen
            });

            console.log("usuario registrado correctamente");
            res.redirect("/");
            } catch (err) {
            console.error(err);
            res.send("Error al registrar usuario");
            }
         },
    editar: async (req, res) => { 
                        try {
                          const Editarusuario = await db.usuarios.findByPk(req.params.id);
        
                  if(Editarusuario){
                        res.render("usuarios/editar", {Editarusuario});
                    }else{
                        res.send("no se encontró al usuario :(")
                    } 
                } catch (error) {
                        console.error("Error:", error);
                        res.status(500).send("Error al obtener los datos de la base de datos");
                      }
                
        //res.render("usuarios/editar")
    },
    editar2: async (req, res) => {
            try {
                console.log("BODY:", req.body);
                console.log("file", req.file);
                /*console.log("PARAMS:", req.params);
                console.log("BODY RAW:", req.body);
                console.log("HEADERS:", req.headers["content-type"]);*/
              const Editarusuario = await db.usuarios.findByPk(req.params.id);
    if (Editarusuario){
        Editarusuario.nombre = req.body.nombre,
        Editarusuario.password= req.body.password,
        Editarusuario.email= req.body.email,
        Editarusuario.edad= req.body.edad

    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
        Editarusuario.imagen = result.secure_url;
    }
        await Editarusuario.save();
        res.redirect("/usuarios/listaUsuarios")
    }else{
        res.send("fallo al editar :(")
    } 
} catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error al editar los datos en la base de datos");
  }},
   creaProducto: (req, res)=> {
   res.render("productos/creaProducto");
   },
   postCreaProducto: async (req, res) => {
         let errors = validationResult(req);
          
           if (!errors.isEmpty()){
            return res.render("productos/creaProducto", { errors: errors.array() })
           }
                
                try { 
                    console.log("BODY:", req.body)
                /*let hashedPassword = bcrypt.hashSync(req.body.password, 10);*/
                let imagen = 'https://res.cloudinary.com/dduyxqrqt/image/upload/v1755726525/pfpDefault_nia0sd.jpg';


     

      if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
        imagen = result.secure_url;
      }

           /* const { nombre, descripcion, precio, cantidad, categorias } = req.body;*/
                
                db.productos.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                cantidad: req.body.cantidad, 
                imagen,
                categoria: req.body.categoria
            });

            console.log("producto creado correctamente");
            res.redirect("/");
            } catch (err) {
            console.error(err);
            res.send("Error al crear el producto");
            }
  }, 
  detalleProducto: async (req, res) => { 
                        try {
                          const detalleProducto = await db.productos.findByPk(req.params.id);
        
                  if(detalleProducto){
                        res.render("productos/detalleProducto", {detalleProducto});
                    }else{
                        res.send("no se encontró el producto :(")
                    } 
                } catch (error) {
                        console.error("Error:", error);
                        res.status(500).send("Error al obtener los datos de la base de datos");
                      }
    }
}


module.exports = controlador;