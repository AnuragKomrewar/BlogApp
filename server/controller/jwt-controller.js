import Jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

//middleware
export const authenticateToken = (request,response,next) =>{
    const authHeader=request.headers['authorization'];
    const token= authHeader && authHeader.split(' ')[1]; //bearer kjqbfeh <--token
    if(token==null){
        return response.status(401).json({msg:"Token is missing"});
    }

    Jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user)=>{
        //verified successful
        if(error){
            return response.status(403).json({msg:"Invalid Token"});
        }

        request.user=user;
        next(); //-->middleware is done pass it to controller createPOst
    });

}