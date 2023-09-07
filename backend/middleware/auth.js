import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'
export const isAuthentiated = async (req, res, next) => {
    try{
        const { token } = req.cookies
        if(!token){
            return res.status(400).json({success: false, message: "❌ Please Login"})
        }
        const decode_user_id = await jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(decode_user_id.id)
        req.user = user
        next()
    }catch(error){
        return res.status(500).json({success: false, message: `❌ ${error.message}`})
    }
}

export const isAdmin = async (req, res, next) => {
    try{
        const { token } = req.cookies
        if(!token){
            return res.status(400).json({success: false, message: "❌ Please Login"})
        }
        const decode_user_id = await jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(decode_user_id.id)
        if(user.role === 'admin'){
            req.user = user
            next()
        }else{
            return res.status(400).json({success: false, message: `❌ Cannot Access`})
        }
    }catch(error){
        return res.status(500).json({success: false, message: `❌ ${error.message}`})
    }
}