require('dotenv').config(); //cargamos varibales de entorno
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs'); //modulo del sistema de archivos de Node.js para leer directorios y archivos
const path = require('path');//manejar y transformar rutas de archivos.
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

//configurando coneccion a la base de datos
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
  }
);

const basename = path.basename(__filename); //obtener el nombre del archivo actual

const modelDefiners = [];
fs.readdirSync(path.join(__dirname, '/models')) //lee archivos en el dir /models
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' //filtra arcivos que no omiences con "." que no sea "basenme y que sean de tipo ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file))(sequelize, DataTypes)); //guardando models filtrados en modelDefiners
  });

  //Capitalizar Nombres de Modelos
let entries = Object.entries(sequelize.models); //obtinene el arrays de objetos de modelos
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries); //crea un nuevo objeto con los nombres capitalizados

const { Product, Category, User, Order, OrderProduct } = sequelize.models;

Product.belongsTo(Category); // Cardinalidad: Muchos Productos a Una Categoría (N:1)
Category.hasMany(Product); // Cardinalidad: Una Categoría a Muchos Productos (1:N)

Order.belongsTo(User); // Cardinalidad: Muchos Pedidos a Un Usuario (N:1)
User.hasMany(Order); // Cardinalidad: Un Usuario a Muchos Pedidos (1:N)

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct }); // Order y Product a través de OrderProduct

//exportando modelos y coneccion
module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
