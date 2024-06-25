import  jwt  from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";

const tokenverify = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies.token;
    const secret = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMDU3NTk3MywiaWF0IjoxNzEwNTc1OTczfQ.daq9weny70apNazg0M-4eVkB4fMab8ixcp_bHRZ7HME"

    if(!token){
        return res.status(400).json({
            success:false,
            message:"Unauthorized: Login first"
        })
    }
    jwt.verify(token,secret, (error:any, decoded:any)=>{
        if(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Invalid token or secret key"
            })
        }else{
            
           req.body.decoded = decoded;
            next();
        }}
    )
};

export default tokenverify