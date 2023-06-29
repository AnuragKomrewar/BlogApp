import User from "../model/user.js";//schema import
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Token from '../model/token.js'

dotenv.config();//dotenv initialization

export const signupUser=async(req,res)=>{ //API
    try{
        //const salt=await bcrypt.genSalt();
        const hashedPassword= await bcrypt.hash(req.body.password,10);
        const user={username:req.body.username, name:req.body.name, password:hashedPassword};
        const newUser=new User(user);//validated user object
        await newUser.save();//saving to database
        //sending response to frontend
        return res.status(200).json({msg:'signup successfull'});

    }catch(error){
        return res.status(500).json({msg:"error while signup the user"})
    }
}

export const loginUser=async (req,res)=>{
    let user=await User.findOne({username:req.body.username});//<-- will return user object
    if(!user){
        return res.status(404).json({msg:'user not found'})
    }
    try{
        let isMathcing=await bcrypt.compare(req.body.password, user.password);
        if(isMathcing){
            //we make accessToken and refreshToken
            const accessToken= jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'}) ; //accessToken expires so we need refreshToken
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);

            //verify
           const newtoken=new Token({token:refreshToken})
           await newtoken.save(); //<-- saving refresh token

           return res.status(200).json({accessToken:accessToken, refreshToken:refreshToken, name:user.name, username:user.username});
        }else{
            return res.status(400).json({msg:'Password is incorrect'});
        }
    }catch(error){ 
        return res.status(500).json({msg:'error while logging in user'})
    }
}
