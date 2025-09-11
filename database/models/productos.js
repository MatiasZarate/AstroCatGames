module.exports = function(sequelize, dataTypes){
    let alias = "productos";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING
        },
        precio: {
            type: dataTypes.INTEGER
        },
        cantidad: {
            type: dataTypes.INTEGER
        },
        imagen: {
            type: dataTypes.STRING
        },
        categoria: {
            type: dataTypes.STRING
        },
    }
    let config = {
        tableName: "productos",
        timestamps: false
    }
    let productosDB = sequelize.define(alias, cols, config);
    return productosDB
}