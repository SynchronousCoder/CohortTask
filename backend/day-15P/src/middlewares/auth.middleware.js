const jwt = require("jsonwebtoken")

async function identifyUser(req, res, next) {
    const token = req.cookies.token

    if(!token){
            res.status(404).json({
        message: "Unauthrozied user, Token not found"
    })
    }

    let decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        res.status(409).json({
            message: "Unauthrozied user, Token not verified"
        })
    }

    req.user = decoded
    next()
}

module.exports = identifyUser