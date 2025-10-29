module.exports = function(sequelize, dataTypes){
    let alias = "usuarios";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        edad: {
            type: dataTypes.INTEGER
        },
        imagen: {
            type: dataTypes.STRING
        },
        admin: {
            type: dataTypes.BOOLEAN
        },
    }
    let config = {
        tableName: "usuarios",
        timestamps: false
    }
    let usuariosDB = sequelize.define(alias, cols, config);
    return usuariosDB
}