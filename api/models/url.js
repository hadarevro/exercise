const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const url = sequelize.define("user", {
    urlId:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    onriginUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shortUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});