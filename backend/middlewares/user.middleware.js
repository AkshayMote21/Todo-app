import User from "../models/auth.models.js";
import jwt from 'jsonwebtoken';

export async function checkIsUserValid(req,res,next){
    try{
        const token = req.cookies.token;
        const data = await jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user = User.findById(data?.userId);
        if(!user){
            return res.json({success:false,error :"User is invalid"});
        }
        req.userId = data.userId;
        next();
    }catch(error){
        return res.json({success:false,error})
    }
}