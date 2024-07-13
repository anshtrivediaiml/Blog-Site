import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { ErrorHandler } from "../utils/error.js";

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