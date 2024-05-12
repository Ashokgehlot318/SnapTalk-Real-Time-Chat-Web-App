const User = require("../models/user.model");
const  generateToken  = require("../utils/generateToken")
const bcryptjs = require('bcryptjs');

exports.signup = async(req,res) =>{
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please Enter all the Feilds");
        }
    try{
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json("user already exists...");
            throw new Error("User already exists");
        }

        const hashedPassword = await bcryptjs.hashSync(password,10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error("User not found");
        }
    }
    catch(error){
        console.log("Sign up page facing a issue"+error);
        res.status(400).json("Internal server error...");
    }
       
}


exports.login = async (req,res) =>{

    const {email, password} = req.body;

    if(!email || !password){
        res.status(404).json("All fields are required...")
        throw new Error("All fields are required...");
    }

    try{
        const validUser =await User.findOne({ email });
            if(!validUser){
                res.status(404).json("User not found.")
                throw new Error("User Not Found");
            }

            const validPassword = bcryptjs.compareSync(password,validUser.password);
            if(!validPassword){
                res.status(404).json("Invalid Password.")
                throw new Error("invalid password");
            }

            if (validUser) {
                res.json({
                  _id: validUser._id,
                  name: validUser.name,
                  email: validUser.email,
                  isAdmin: validUser.isAdmin,
                  pic: validUser.pic,
                  token: generateToken(validUser._id),
                });
              } 
              else {
                res.status(401);
                throw new Error("Invalid Email or Password");
              }
    }
    catch(error){
        console.log("Login page facing a issue"+error);
        res.status(400).json("Internal server error...");
    }
}