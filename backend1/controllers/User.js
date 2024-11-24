// import { User} from "../models/userModel.js";

import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
// import cookie from "cookie";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(401).json({
                message: "Invalid data",
                success: false
            })
        };

        const user = await User.findOne({email});
        if (!user){
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res .status(401).json({
                message: "Invalid email or password",
                success: false
            })
        }
        
        // const tokenData = {
        //     id: user._id,
        // }
        const token = await jwt.sing("token","rsedtfchgvjbhnpjh", {expiresIn:"1d"});
        return res.status(200).cookie("token", token, {httpOnly: true}).json({
            message: `welcome back ${user.fullName}`,
            success: true
        });
    }catch(error){
        console.log(error);
    }
}

export const Logout = async (req, res) =>{
    try{return res.status(200).cookie("token","",{expiresIn: new Date(Date.now()),httpOnly:true}).json({
        message: "User Logged out successfully",
        success: true
    })
 }catch(error){
    console.log(error);
}
}  

export const Register =  async (req, res) => {
    try{
        const {fullName, email, password} = req.body;
        if(!fullName || !email || !password){
            return res.status(401).json({
                message: "All fields are required",
                success: false
            })
        } 
        const user = await User.findOne({ email });
        if(user){
            return res.status(401).json({
                message: "Email already exists",
                success: false
            })
        }

        // const heshedPassword = await bcryptjs.hashedPassword(password,12);
        await User.create({
            fullName,
            email,
            password
            // password:hashedPassword
        });
        return res.status(201).json({
            message: "registered successfully",
            success: true,
        });

    }catch(error){
        console.log(error);
    }
};