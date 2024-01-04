const express = require('express')
const bodyParser = require('body-parser') 
const cors = require('cors')
const app = express() 

app.use(cors()) 


const sequelize = require('./util/database')
const userRoutes = require('./Routes/user')
 
const signupTable = require('./Models/signupTable')
const bookTable = require('./Models/bookTable')
const rentedBooksTable = require('./Models/rentedBooksTable')

signupTable.hasMany(rentedBooksTable)  
rentedBooksTable.belongsTo(signupTable)

signupTable.hasMany(bookTable)  
bookTable.belongsTo(signupTable)


app.use(bodyParser.json({extended: false})) 

app.use(userRoutes) 


sequelize.sync().then(() => {
    console.log('app running')
    app.listen(5500)
})
.catch((err) => console.log(err))