const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



module.exports.register = async(req,res)=>{
    try{
        const {name,email,password} = req.body
        const user = await userModel.findOne({email})

        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new userModel({name,email,password})

        await newUser.save()

        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'3h'})
        res.cookie('token',token)
        delete newUser._doc.password
        res.send({token,newUser,message:"User registered successfully"})
    }
    catch(error){
        res.status(500).json({error:error})
    }
} 

module.exports.login = async(req,res)=>{
    try{
        const{email,password}  = req.body
        const user = await userModel.findOne({email}).select('+password')
        
        if(!user){
            res.status(400).json({message:"Invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(400).json({message:"Invalid password"})
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        
    }catch(error){
        res.status('404').json({error:error})
    }

    module.exports.logout = async (req, res) => {
        try {
            const token = req.cookies.token;
            await blacklisttokenModel.create({ token });
            res.clearCookie('token');
            res.send({ message: 'User logged out successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}