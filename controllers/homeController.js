const fs = require("fs")
const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
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
const { where } = require("sequelize");

const controlador = {
    index: async(req, res) => {
    try{
        const listado = await db.usuarios.findByPk(req.params.id);

        const listaProductos = await db.productos.findAll({
    order: [['id', 'DESC']]   
    });
        const productosUltimos = await db.productos.findAll({
    where: {cantidad: "1"}
    });
      
      console.log("🧠 Carrito actual al cargar la vista:", req.session.carrito);
      const carrito = req.session.carrito || [];
      res.render("index", {listaProductos, productosUltimos, userLogged: req.session.userLogged, carrito})
        
    }catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al obtener los datos de la base de datos");
    }},
    prueba: (req, res) =>{
        res.render("prueba") 
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
    perfil: async (req, res) => { 
                        try {
                          const listado = await db.usuarios.findByPk(req.params.id);
        
                  if(listado){
                        res.render("usuarios/perfil", {listado});
                    }else{
                        res.send("no se encontró el usuario :(")
                    } 
                } catch (error) {
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
    inicioSesionDos: async(req,res)=>{
      try {
      /*let user = db.usuarios;
      let userToLogin = await user.findByField("nombre", req.body.nombre)*/
      const userToLogin = await db.usuarios.findOne({
      where: { nombre: req.body.nombre }
      });
     
     if(userToLogin){
    let isOkiDoky = await bcrypt.compare(req.body.password, userToLogin.password);
    if(isOkiDoky){
      delete userToLogin.password;
      req.session.userLogged = userToLogin;
      
      return res.redirect("/")
    }else/*error?*/{
      return res.render("usuarios/inicioSesion", {
        errors:{
          nombre:{msg: "La contraseña es invalida"}},
      old: req.body
      });
     }
     }else{
      return res.render("usuarios/inicioSesion", {
        errors:{
          nombre:{msg: "no se encuentra al usuario"}},
      old: req.body
      })
     }
    }catch(error){
      throw error;
    }
    },
    logOut: (req,res) => {
     req.session.destroy();
     return res.redirect("/")
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
     

      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error al borrar el archivo local:", err);
        } else {
          console.log("Archivo temporal eliminado:", req.file.path);
        }
      });
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
    }, 
    editar2: async (req, res) => {
            try {               
              const Editarusuario = await db.usuarios.findByPk(req.params.id);
    if (Editarusuario){
    let hashedPassword = Editarusuario.password

    if (req.body.password && req.body.password.trim() !== "") {
        hashedPassword = bcrypt.hashSync(req.body.password, 10);
      }
     

        Editarusuario.nombre = req.body.nombre,
        Editarusuario.password= hashedPassword,
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
                let imagen = 'https://res.cloudinary.com/dduyxqrqt/image/upload/v1758029127/jj6kt2ltwhja5qtrhulx.png';


     

      if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
        imagen = result.secure_url;

        fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error al borrar el archivo local:", err);
        } else {
          console.log("Archivo temporal eliminado:", req.file.path);
        }
      });
      }
                
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
    },
  deleteProducto: async(req, res)=>{
        try{
            const deleteProducto = await db.productos.findByPk(req.params.id);

        if(deleteProducto){
            await deleteProducto.destroy();
            res.redirect("/");
        }} catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al eliminar los datos de la base de datos");
        }
    },
  editarProducto: async (req, res) => { 
                        try {
                          const editarProducto = await db.productos.findByPk(req.params.id);
        
                  if(editarProducto){
                        res.render("productos/editarProducto", {editarProducto});
                    }else{
                        res.send("no se encontró al producto :(")
                    } 
                } catch (error) {
                        console.error("Error:", error);
                        res.status(500).send("Error al obtener los datos de la base de datos");
                      }
                
    
 
    },
  editarProducto2:async (req, res) => {
            try {
                console.log("BODY:", req.body);
                console.log("file", req.file);
              
              const editarProducto = await db.productos.findByPk(req.params.id);
    if (editarProducto){
        editarProducto.nombre = req.body.nombre,
        editarProducto.descripcion = req.body.descripcion
        editarProducto.precio = req.body.precio
        editarProducto.cantidad = req.body.cantidad
        editarProducto.categoria = req.body.categoria

    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
        editarProducto.imagen = result.secure_url;
    }
        await editarProducto.save();
        res.redirect("/")
    }else{
        res.send("fallo al editar :(")
    } 
} catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error al editar los datos en la base de datos");
  }},
  videojuegos: async(req, res) =>{
        try{
            const listadoProductos = await db.productos.findAll({
              where: {categoria:"juegos"}
            });
            res.render("categorias/videojuegos", { listadoProductos })
        }catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al obtener los datos de la base de datos");
        }
    },
    consolas: async(req, res) =>{
        try{
            const listadoProductos = await db.productos.findAll({
              where: {categoria:"consolas"}
            });
            res.render("categorias/consolas", { listadoProductos })
        }catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al obtener los datos de la base de datos");
        }
    },
    accesorios: async(req, res) =>{
        try{
            const listadoProductos = await db.productos.findAll({
              where: {categoria:"accesorios"}
            });
            res.render("categorias/accesorios", { listadoProductos })
        }catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al obtener los datos de la base de datos");
        }
    },
    merch: async(req, res) =>{
        try{
            const listadoProductos = await db.productos.findAll({
              where: {categoria:"merch"}
            });
            res.render("categorias/merch", { listadoProductos })
        }catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al obtener los datos de la base de datos");
        }
    },
    packs: async(req, res) =>{
        try{
            const listadoProductos = await db.productos.findAll({
              where: {categoria:"packs"}
            });
            res.render("categorias/packs", { listadoProductos })
        }catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al obtener los datos de la base de datos");
        }
    },
    agregarProducto: (req, res) =>{
      const producto = req.body;

      if(!req.session.carrito){
        req.session.carrito = [];
        console.log("🆕 Nueva sesión iniciada, carrito creado vacío");
      }

      const { nombre, precio } = req.body;

      const existente = req.session.carrito.find(p => p.nombre === nombre);

      if (existente) {
      existente.quantity++;
      console.log("🔁 Producto ya existía, nueva cantidad:", existente.quantity);
      } else {
      req.session.carrito.push({
      nombre,
      precio,
      quantity: 1
    });
    console.log("🛒 Producto agregado al carrito:", { nombre, precio });
      }
       req.session.save(err => {
    if (err) console.error("Error guardando sesión:", err);
    console.log("💾 Sesión guardada correctamente");

    res.json({ ok: true, carrito: req.session.carrito });
    console.log("📦 Enviando carrito desde sesión:", req.session.carrito);

  });
        /*req.session.save(() => {
    res.json({ ok: true, carrito: req.session.carrito });
  });*/
      /*res.json({ carrito: req.session.carrito });*/
  },
  verCarrito: (req, res) => {
  const carrito = req.session.carrito || [];
  console.log("📦 Enviando carrito desde sesión:", carrito);
  res.json({ carrito });
},
    eliminarProducto: (req, res) => {
      const { nombre } = req.body;
       if (req.session.carrito) {
    // Filtra el producto fuera del carrito
    req.session.carrito = req.session.carrito.filter(p => p.nombre !== nombre);
  }
       req.session.save(() => {
    console.log("🗑 Producto eliminado:", nombre);
    res.json({ ok: true, carrito: req.session.carrito });
  });
    }
}


module.exports = controlador;