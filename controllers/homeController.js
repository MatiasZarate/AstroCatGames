const path = require("path");
/*const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");*/

/*
const mysql = require("mysql");

let conexion = mysql.createConnection({
    host:"localhost", 
    database:"loquendo",
    user:"root",
    password:""
})*/

const controlador = {
    index: (req,res)=>{
        res.render("index")
    },
    prueba: (req, res) =>{
        res.render("prueba") /**/ 
    },
    listaUsuarios: (req, res) =>{
        res.render("usuarios/listaUsuarios")
    },
    inicioSesion: (req, res) =>{
        res.render("usuarios/inicioSesion")
    },
    registro: (req, res) =>{
        res.render("/usuarios/registro")
    }
}

module.exports = controlador;