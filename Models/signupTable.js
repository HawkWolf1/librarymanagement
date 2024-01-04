const Sequelize = require('sequelize')

const sequelize = require('../util/database')


const signupTable = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    name: {
        type: Sequelize.STRING,
    },
    
    email: {
        type: Sequelize.STRING,

    },
    password: {
        type: Sequelize.STRING,
        
    },
    phone: {
        type: Sequelize.INTEGER,
        
        
    },
    role:{
        type: Sequelize.STRING,
    }
},
{
    timestamps: false
}
)   

module.exports = signupTable