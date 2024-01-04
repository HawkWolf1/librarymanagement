const Sequelize = require('sequelize')

const sequelize = require('../util/database')


const bookTable = sequelize.define('book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    bookName: {
        type: Sequelize.STRING,
    },
    
    author: {
        type: Sequelize.STRING,

    }
},
{
    timestamps: false
}
)   

module.exports = bookTable