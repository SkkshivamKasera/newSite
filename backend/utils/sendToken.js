export const sendToken = async (user, set, message, res) => {
    try{
        let token
        if(user){
            token = await user.getJWTToken()
            if(!token){
                return res.status(400).json({success: false, message: "❌ Token Not Generate"})
            }
        }
        res.status(200).cookie("token", set ? token : "null", {
            httpOnly: true,
            maxAge: set ? process.env.COOKIE_EXPIRE_DAY * 24 * 60 * 60 * 1000 : 0
        }).json({success: true, message: message})
    }catch(error){
        return res.status(500).json({success: false, message: `❌ ${error.message}`})
    }
}