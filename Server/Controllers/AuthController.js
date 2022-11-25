import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



//create new user
export const registerUser = async(req, res)=>{

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password,salt)
    req.body.password = hashedPass
    const newUser = new UserModel(req.body);

    const {username} = req.body

    try {
        const oldUser = await UserModel.findOne({username})
        if(oldUser)
        {
            return res.status(400).json("Username is already used")
        }
       const user = await newUser.save()

        //creating a token for authentication
        const token = jwt.sign({
            username:user.username,id:user._id
        },process.env.JWT_KEY,{expiresIn:"1h"})
        res.status(200).json({user,token})

    } catch (error) {
        console.log("error occured")
        res.status(500).json({message:error.message})
    }
}


//Login user
export const LoginUser = async(req,res)=>{
    const{username,password} = req.body;

    try {
        const user = await UserModel.findOne({username:username})

        if(user)
        {
            const validity = await bcrypt.compare(password,user.password)

            if(!validity)
            {
                res.status(400).json("Wrong Password")
            }
            else{

                const token = jwt.sign({
                    username:user.username,id:user._id
                },process.env.JWT_KEY,{expiresIn:"1h"})

                res.status(200).json({user,token})

            }
        }
        else{
            res.status(400).json("User doesnot exists")
        }
    } catch (error) {
        console.log("error occured")
        res.status(500).json({message:error.message})
    }

}