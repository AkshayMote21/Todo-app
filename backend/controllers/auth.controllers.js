import User from "../models/auth.models.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Register = async(req,res) => {
    try{
        const {name,email,password} = req.body.userData;
        if(!name || !email || !password){
           return res.json({success:false,error:"All fields are mandatory!!"});
        }
        const isEmailExists = await User.findOne({email});
        if(isEmailExists){
           return res.json({success:false,error:"Email already exists, please use anothre email!"});
        }
        const encryptedPassword = await bcrypt.hash(password,12);
        const newUser = new User({
            name,
            email,
            password : encryptedPassword
        });
        await newUser.save();
        return res.json({success:true,message:"Registration succesful"});
    }catch(error){
       return res.json({success:false,error :"Error at catch"});
    }
}

export const Login = async(req,res) => {
    try{
        const {email,password} = req.body.userData;
        if(!email || !password){
          return  res.json({success:false,error:"All fields are required!!"});
        }
        const isEmailExists = await User.findOne({email});

        if(!isEmailExists){
           return res.json({success:false,error:"Email not found!"});
        }
        const isPasswordCorrect =  await bcrypt.compare(password,isEmailExists.password);
        if(!isPasswordCorrect){
           return res.json({success:false,error:"Password is incorrect!!"});
        }
        const token = await jwt.sign({userId:isEmailExists._id},process.env.JWT_SECRET_KEY);
        const userData = {name :isEmailExists.name,email:isEmailExists.email}
        await res.cookie("token",token);
        return res.json({success:true,message:"Login Successful",userData});
    }catch(error){
      console.log(error,"eror");
       return res.json({success:false,error:"Error at catch"});
    }
    
}

export const getCurrentUser = async(req,res) => {
   try{
      const token = req.cookies.token; 
      const data = await jwt.verify(token,process.env.JWT_SECRET_KEY);
      const user = await User.findById(data?.userId);
      if(!user){
         return res.json({success:false});
      }
      const userData = {name :user.name, email : user.email}
      return res.json({success:true,userData :userData});
   }catch(error){
     return res.json({error:error,success:false});
   }
 };

export const Logout = async(req,res) =>{
   const token = req.cookies.token;
   const data = await jwt.verify(token,process.env.JWT_SECRET_KEY);
   const user = await User.findById(data?.userId);
   if(!user){
       return res.json({success:false});
   }
   res.clearCookie('token');
   return res.json({ message: 'User Logged out successfully' ,success:true});
 };
