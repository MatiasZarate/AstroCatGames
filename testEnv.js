require("dotenv").config();

console.log("HOST:", process.env.DB_HOST);
console.log("USER:", process.env.DB_USER);
console.log("PASS:", process.env.DB_PASSWORD === "" ? "(vacío)" : process.env.DB_PASSWORD);