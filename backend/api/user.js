import express from 'express'
import User from '../model/User.js';
import MESSAGES from '../Utils/Constant.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = express.Router();


router.post('/signup', async (req,res) => {
    console.log('inside signup')
    try {
        const {username,email,password} = req.body;
        console.log("Signup request",username,email,password) 
        
        const existingEmail = await User.findOne({email:email})
        if(existingEmail){
            return res.status(400).json('Email already exists')
        }
        const hashpass = await bcrypt.hash(password,10)
        const newUser = new User({
            username,
            email,
            password:hashpass
        })
        console.log("Signup new user object",newUser)
        const newUserCreated = await newUser.save()
        if(newUserCreated){
            res.status(200).json("Account created successfully!")
        }
    } catch (error) {
        console.log("Error",error);
        res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR)
    }
})
router.post('/signin', async (req,res) => {
    console.log('inside signin')
    try {
        const {email,password} = req.body;
        console.log("Signin request",email,password) 
        
        const existingUser = await User.findOne({email:email})
        if(!existingUser){
            return res.status(400).json('Invalid credentials')
        }
        bcrypt.compare(password,existingUser.password,(err,data) => {
            if(data){
                const authClaims = [
                    {name: existingUser.username }
                ]
                const token = jwt.sign({authClaims},'fitnessstore',{
                    expiresIn:"5d",
                })
                res.status(200).json({
                    id:existingUser._id,
                    token,
                    message:"Signin Successful"
                })
            }else{
                res.status(400).json({ message: "Invalid credentials", error: err.message });
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });

    }
})

export default router;