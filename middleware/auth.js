const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

const auth = async (req,res,next)=>{
    try{
        if(!req.headers.authorization)
            throw new Error('Authentication Failure');
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        const user = await User.findOne({email: decoded.email});
        if(!user)
            throw new Error('Authentication Failure');
        req.user = user;
    }
    catch(e){
        return res.send({
            message: e.message
        })
    }
    next();
}

module.exports = auth;