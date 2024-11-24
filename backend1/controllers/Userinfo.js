import { User } from "../models/userModel.js";


export const Register = async (req, res) => {
    try{
        const {fullName, email, password} = req.body;
        if(!fullName || !email || !password){
            return res.status(401).json({
                message: "All fields are required",
                success: false
            })
        } 
        // const user = await Userinfo
        const user = await User.findone({email});
        if(user){
            return res.status(401).json({
                message: "Email already exists",
                success: false
            })
        }
        await Userinfo.create({
            fullName,
            email,
            password
        });
        return res.status(201).json({
            message: "User registered successfully",
            success: true
        });

    }catch(error){
        console.log(error);
    }
};