const jwt = require('jsonwebtoken')

function signToken(payload){
    const token = jwt.sign(payload, process.env.JWTSECRET)
    return token
}

function verifyToken(token){
    const payload = jwt.verify(token, process.env.JWTSECRET) 
    return payload
}

module.exports = { 
    signToken,
    verifyToken
}