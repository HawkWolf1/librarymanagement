const signupTable = require("../Models/signupTable")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')




function generateAccessToken(id, name){
    return jwt.sign({id:id, name:name}, 'Rockettt')
}


const loginN = async (req, res, next) => {
    try{
    const {email, password} = req.body
    const user = await signupTable.findAll({where :{email}})
        if(user.length >0){
            bcrypt.compare(password, user[0].password, (err,result) => {
                if(err){
                    res.status(500).json({success: false, message: 'We got some error'})
                }
                if(result===true){
                    res.status(200).json({
                        success: true, 
                        message: 'Login is successful', 
                        token: generateAccessToken(user[0].id, user[0].name),
                        role: user[0].role
                    })
                }
                else{
                  return res.status(400).json({success: false, message: 'Password is incorrect'})
                }
                
            })
           

        } else{
            return res.status(404).json({success: false, message: 'No such User exists'})
        }
    }catch(err){
        res.status(500).json({message: err, success: false})
    }
}



module.exports = {
    loginN
}