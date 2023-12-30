import connectDB from "@/db";
import User from "@/models/user-model";

export default async function handler(req, res){
    if(req.method==="POST"){
        connectDB();
        const {email, password}= req.body;
        if(!email || !password){
            return res.status(400).json({msg:"Email and password are necessary to login.."});
        }

        const emailExist=await User.findOne({email});
        if(!emailExist){
            return res.status(400).json({msg:"Please register first.."});
        }

        return res.status(200).json({msg:"Logged in successfully!", user: emailExist});
    }
}