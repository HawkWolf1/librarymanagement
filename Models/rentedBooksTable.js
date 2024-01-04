const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const rentedBooksTable = sequelize.define('rentedBook', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bookName:{
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    personRented:{
        type: Sequelize.STRING,
    },
    rentedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
},
{
    timestamps: false
});

module.exports = rentedBooksTable;
