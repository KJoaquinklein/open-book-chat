const { DataTypes } = require("sequelize");

module.exports = (Sequelize) => {
    Sequelize.define("Message", {
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
