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
        imagen: {
            type: dataTypes.STRING
        },
    }
    let config = {
        tableName: "usuarios",
        timestamps: false
    }
    let usuariosDB = sequelize.define(alias, cols, config);
    return usuariosDB
}