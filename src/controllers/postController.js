const postModel = require("../models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const register = async(req,res) =>{

    const {username,email,password} = req.body;
    try {
        
        const existingUser = await postModel.findOne({email:email});
        if (existingUser){
            return res.status(400).json({message:"User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await postModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        const token = jwt.sign({email : result.email, id : result._id }, SECRET_KEY);
        res.status(201).json({user: result, token: token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

const login = async(req,res) =>{

    const {email, password} = req.body;
    try {
        
        const existingUser = await postModel.findOne({email:email});
        if (!existingUser){
            return res.status(404).json({message:"User not Found"});
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if (!matchPassword){
            res.status(400).json({message:"Invalid Credentials"});
        }

        const token = jwt.sign({email:existingUser.email, id:existingUser._id}, SECRET_KEY);
        res.status(201).json({user:existingUser,token:token});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }

}

module.exports = {register,login};