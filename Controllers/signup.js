const signupTable = require("../Models/signupTable")

const bcrypt = require('bcrypt')


const addUser = (req, res, next) => {
    try{
    const {name, email, password, phone, role} = req.body
    
    const saltrounds = 10
    bcrypt.hash(password, saltrounds, async(err, hash) =>{
        console.log(err)
       
    await signupTable.create({ 
    name, 
    email, 
    password: hash,
    phone,
    role
 })

    res.status(201).json({ message: 'New User created Successfully!' }) 
})
    }catch(err){
    res.status(500).json(err)
    }
}




module.exports={
    addUser
}