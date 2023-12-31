import connectDB from "@/db";
import User from "@/models/user-model";
import bcrypt from 'bcrypt';

export default async function handler(req, res){
    if(req.method==="POST"){
        connectDB();
        const {name, email, password}= req.body;
        if(!name || !email || !password){
            return res.status(400).json({msg:"All the feilds are necessary.."});
        }
        const emailExist= await User.findOne({email});
        if(emailExist){
            return res.status(400).json({msg:"user alredy registered"});
        }

        const hashed=await bcrypt.hash(password, 10);
        const user= new User({
            name,
            email,
            password: hashed,
        })

        const result=await user.save();
        return res.status(200).json({msg:"registered..", user: result});
    }
}