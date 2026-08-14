const jwt = require("jsonwebtoken")

async function identifyUser(req, res, next) {
    const token = req.cookies.token
    if(!token){
        res.status(404).json({
            message: "Unauthrozied user, Token not found"
        })
    }
    
    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        res.status(409).json({
            message: "Unauthrozied User, Token not verified"
        })
    }

    // attaching data to the request object (It’s basically a custom property on the req object.)
    // that property (aryan) becomes part of the request object (req) and is 
    // available to all subsequent middleware and route handlers in the chain.
    req.user = decoded

    next()
}

module.exports = identifyUser