const fs = require("fs") /*para escribir*/
const path = require("path");
const bcrypt = require("bcryptjs"); /*para hasheo */
const { validationResult } = require("express-validator");
let db = require("../database/models"); /*los modelos de las base de datos */

const cloudinary = require("cloudinary").v2; /*mi hermoso cloudinary */
const streamifier = require("streamifier");

/*su no tan hermosa configuración */
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
  const { Op } = require('sequelize');

        const listado = await db.usuarios.findByPk(req.params.id);

        const listaProductos = await db.productos.findAll({
    order: [['id', 'DESC']]   
    });
        const productosUltimos = await db.productos.findAll({
    where: {cantidad: "1"}
    });
        const productosEconomicos = await db.productos.findAll({
      where: {
                precio: {
                  [Op.lt]: 50000 
                }
            }
    });
        const productosEnOferta = await db.productos.findAll({
            where: {
                ofertas: {
                  [Op.ne]: null 
                }
            }
        });
      
    res.render("index", {listaProductos, productosUltimos, productosEconomicos, productosEnOferta, userLogged: req.session.userLogged})/*envia todos estos para ser usados en la vista */
        
    }catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al obtener los datos de la base de datos");/*algún día hare una vista personalizada para cuando no conecta a la base de datos */
    }},
    prueba: (req, res) =>{
        res.render("prueba") 
    }, 

    /*usuarios */
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
                          const listado = await db.usuarios.findByPk(req.params.id); /*busca el id del usuario */
        
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
      const userToLogin = await db.usuarios.findOne({
      where: { nombre: req.body.nombre }
      });
     
     if(userToLogin){
    let isOkiDoky = await bcrypt.compare(req.body.password, userToLogin.password); 
    if(isOkiDoky){
      delete userToLogin.password; 
      req.session.userLogged = userToLogin; /*para que se mantenga el mismo hash */
      
      return res.redirect("/")
    }else{
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
           }/*validación */
                
                try {  /*hasheo y foto predeterminada si no hay .file */
                let hashedPassword = bcrypt.hashSync(req.body.password, 10);
                let imagen = 'https://res.cloudinary.com/dduyxqrqt/image/upload/v1755726525/pfpDefault_nia0sd.jpg';


      if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
        imagen = result.secure_url;
     
      /*borrar la imagen que se sube a upload */
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
            });/*creación usuario */

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
      }/*para que se guarde el mismo hash */
     

        Editarusuario.nombre = req.body.nombre,
        Editarusuario.password= hashedPassword,
        Editarusuario.email= req.body.email,
        Editarusuario.edad= req.body.edad

    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
        Editarusuario.imagen = result.secure_url;
    }
        await Editarusuario.save();/*se guarda :v */
        res.redirect("/usuarios/listaUsuarios")
    }else{
        res.send("fallo al editar :(")
    } 
} catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error al editar los datos en la base de datos");
  }},

  /*productos */
   creaProducto: (req, res)=> {
   res.render("productos/creaProducto");
   },
   postCreaProducto: async (req, res) => {
         let errors = validationResult(req);
          
           if (!errors.isEmpty()){
            return res.render("productos/creaProducto", { errors: errors.array() })
           }
                
                try { 
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
            await deleteProducto.destroy();/*busca el producto y lo destruye >:v */
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
    if (editarProducto){/*para que aparezcan todos los valores */
        editarProducto.nombre = req.body.nombre,
        editarProducto.descripcion = req.body.descripcion
        editarProducto.precio = req.body.precio
        editarProducto.cantidad = req.body.cantidad
        editarProducto.categoria = req.body.categoria/*got you*/ /*no anda correctamente */

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
  oferta: async (req, res) => { 
                        try {
                          const oferta = await db.productos.findByPk(req.params.id);
        
                  if(oferta){
                        res.render("productos/oferta", {oferta});
                    }else{
                        res.send("no se encontró al producto :(")
                    } 
                } catch (error) {
                        console.error("Error:", error);
                        res.status(500).send("Error al obtener los datos de la base de datos");
                      }
    },
  oferta2:async (req, res) => {
            try {
                console.log("BODY:", req.body);
              
              const oferta = await db.productos.findByPk(req.params.id);
    if (oferta){/*para que aparezcan todos los valores */
        /*oferta.precio = req.body.precio*/
        oferta.ofertas = req.body.oferta

        await oferta.save();
        res.redirect("/")
    }else{
        res.send("fallo al editar :(")
    } 
} catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error al editar los datos en la base de datos");
  }},
  deleteOferta: async(req, res)=>{
        try{
        const productoConOferta = await db.productos.findByPk(req.params.id); 

        if (productoConOferta) {
            productoConOferta.ofertas = null; // O 0, si ese es tu valor predeterminado.

            await productoConOferta.save();
            return res.redirect("/");
        } else {
            return res.status(404).send("Producto no encontrado para eliminar la oferta."); 
        }
    } catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al eliminar los datos de la base de datos");
        }
},
  videojuegos: async(req, res) =>{
        try{
            const listadoProductos = await db.productos.findAll({
              where: {categoria:"juegos"} /*filtra por categoria */
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
    tarjeta: (req, res) =>{
    res.render("productos/tarjeta")
    },

    /*carrito */
    agregarProducto: (req, res) =>{
      const /*producto = req.body;*/ { nombre, precio, ofertas } = req.body;

      if(!req.session.carrito){ /*guarda en session */
        req.session.carrito = [];
      }

      /*const { nombre, precio } = req.body;*/

      const existente = req.session.carrito.find(p => p.nombre === nombre);

      if (existente) {
      existente.quantity++;/*si existe le aumenta el valor */
      } else {
      req.session.carrito.push({ /*si no, lo añade al carro */
          nombre,
          precio,
          // 💡 CORRECCIÓN 2: Guardar el valor de la oferta (será null o el precio de oferta)
          ofertas, 
          quantity: 1
        });
   /* console.log(" Producto agregado al carrito:", { nombre, precio });*/
      }
       req.session.save(err => {
    if (err) console.error("Error guardando sesión:", err);

    res.json({ ok: true, carrito: req.session.carrito });

  });
  },
   verCarrito: (req, res) => { /*abre el carro */
    const carrito = req.session.carrito || [];
    res.json({ carrito });
},
   eliminarProducto: (req, res) => {
      const { nombre } = req.body;
       if (req.session.carrito) {
       // Filtra el producto fuera del carrito
      req.session.carrito = req.session.carrito.filter(p => p.nombre !== nombre);
  }
    req.session.save(() => { /*guarda el carro luego de eliminar dx */
    res.json({ ok: true, carrito: req.session.carrito });
  });
    },
   finalizarCarrito: (req, res) => {
    req.session.carrito = []; /*vaciarlo */
    res.redirect("/")
    }
}


module.exports = controlador;