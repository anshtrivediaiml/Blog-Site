import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { ErrorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup= async(req,res,next)=>{
   const {username,email,password}=req.body;

   if(!username || !email || !password || username=="" || email=="" || password==""){
      next(ErrorHandler(400,"All fields are required"))
   }

   const hashedPass=bcryptjs.hashSync(password,10);

   const newUser= new User({
         username,
         email,
         password:hashedPass,
   })

   try{
   await newUser.save();
   res.json('Signup successful');
   }
   catch(err){
    next(err);
   }
 
}

export const signin=async(req,res,next)=>{
   const {email,password}=req.body;
   if(!email || !password || email=='' || password==''){
      next(ErrorHandler(400,"All fields are required"))
   }

   try{
      const validUser= await User.findOne({email});
      if(!validUser){
       next(ErrorHandler(404,'User Not Found'));
      }
      const validPassword=bcryptjs.compareSync(password,validUser.password);
      if(!validPassword){
        return next(ErrorHandler(401,'Invalid Credentials'));
      }

      const {password:pass,...rest}=validUser._doc;
      const token=jwt.sign({
         Id:validUser._id},process.env.VITE_JWT_SECRET,);
         res.status(200).cookie('access_token',token,{
            httpOnly:true,}).json('SignIn Successful').json(rest);
         }
            catch(err){
      next(err);
   }
}

export const googleOAuth =async(req,res,next)=>{
   const {email,name,googlePhotoUrl}=req.body;
   try{
    const user=await User.findOne({email});
    if(user){
      const token= jwt.sign({id:user._id},process.env.VITE_JWT_SECRET);
    
    const {password,...rest}=user._doc;
    res.status(200).cookie('access_token',token,{
      httpOnly:true,
    }).json(rest);
   } 
   else{
     //generating a random password for google oauth users as password is compulsory to create a user in the model
     const generatePassword=Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
     const hashedPassword=bcryptjs.hashSync(generatePassword,10);

     const newUser= new User({
      username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
      email,
      password:hashedPassword,
      profilePicture:googlePhotoUrl,
     });
     await newUser.save();
     const token = jwt.sign({id:newUser._id},process.env.VITE_JWT_SECRET);
     const {password,...rest}=newUser._doc;
     res.status(200).cookie('access_token',token,{
      httpOnly:true,
     }).json(rest);
   }


   }catch(err){
      next(err);
   }
}