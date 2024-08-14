require('dotenv').config();
const { Sequelize } = require('sequelize');
console.log(process.env)

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Asegúrate de incluir el puerto
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Asegúrate de incluir el puerto
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT, // Asegúrate de incluir el puerto
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
};
