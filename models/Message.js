const { DataTypes, Sequelize } = require("sequelize");

module.exports = (Sequelize) => {
    sequelize.define("Message", {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
