const bcrypt = require('bcrypt');
const UserModel = require('../Models/Users');
const jwt = require("jsonwebtoken");





const signup  = async(req, res) => {
    try{
        const { name, email, password} = req.body;
        const user = await UserModel.findOne({ email });
        if(user){
            return res.status(409)
                .json({message : "User already exists ", sucess: false});
        }
        const userModel = new UserModel({ name, email, password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
            .json({
                message : "Signup successfully",
                sucess : true
            });
    }catch(err){
        res.status(500)
            .json({
                message : "Signup failed!!",
                sucess : false
            });

    }
}

const login  = async(req, res) => {
    try{
        const {  email, password} = req.body;
        const user = await UserModel.findOne({ email });
        const errorMessage = "Auth failed....email or password incorrect"
        if(!user){
            return res.status(403)
                .json({message : errorMessage, sucess: false});
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403)
                .json({message : errorMessage, sucess: false});
         }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user.id},
            process.env.JWT_SECRET,
            { expiresIn: '24h'}
        );

        res.status(200)
            .json({
                message : "Login Sucess",
                sucess : true,
                jwtToken,
                email,
                name: user.name
            });

    }catch(err){
        res.status(500)
            .json({
                message : "Internal server error",
                sucess : false
            });

    }
}

module.exports = {
    signup ,
    login
}