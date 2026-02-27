const jwt = require("jsonwebtoken")

async function identifyUser(req, res, next) {
    //token match krna hai
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "unthorized user"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(err){
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = identifyUser