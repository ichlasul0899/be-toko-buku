const { signToken } = require('../helpers/jwt');
const { hashPassword, comparePassword } = require("../helpers/bcrypt")
const { user } = require("../models/user")

class AuthController {
    static async register(req,res,next){
        let { email, password, username, gender, birthdate } = req.body 
        const new_pass = hashPassword(password)
        try{
            const create_user = await user.create({
                email, password: new_pass, username, gender, birthdate
            })

            if (create_user){
                console.log(create_user)
                res.status(201).json({
                    status_code : 201,
                    message: "Register Success",
                    data:{
                        email,
                        password: new_pass,
                        username,
                        gender,
                        birthdate
                    }
                })
            }
        } catch(err){
            res.status(400).json({
                status_code:400,
                message: "Error Register"
            })
        }

        
    }

    static async login(req,res,next){
        let { email, password } = req.body 

        try{
            const findUser = await user.findOne({email})

            if(findUser){
                console.log('User Exist')
                const authenticate = comparePassword(password, findUser.password)
                if (authenticate){
                    console.log("Authenticate,", authenticate)
                    const token = signToken({
                        user: findUser.username,
                        email
                    })
                    console.log('Token', token)
                
                    res.status(200).json({
                        message: 'Login Success,',
                        username: findUser.username,
                        token
                    })
                } else{
                    console.log('Wrong Password')
                }
            }
        } catch(err){
            res.status(400).json({
                status_code:400,
                message: "Error Login"
            })
        }
    }


}

module.exports = AuthController;