const { Sequelize } = require("sequelize");
const messageModel = require("./models/Message");

const sequelize = new Sequelize(
    "postgres://openbookchatdb_user:VA4uMkllZYuwpuHbI9odhFdfiOyVxF2h@dpg-cojb7tun7f5s73c6cn70-a/openbookchatdb",
    {
        dialect: "postgres",
        logging: false,
        native: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Usar false si no tienes un certificado de CA válido
            },
        },
    }
);

messageModel(sequelize);

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
