require("dotenv").config();
const { Sequelize } = require("sequelize");
const messageModel = require("./models/Message");
// const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://postgres:Samictwd15@localhost/openbookchat`, {
    logging: false,
    native: false,
});

messageModel(sequelize);

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
