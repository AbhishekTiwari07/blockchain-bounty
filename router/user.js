const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../model/user');
require('dotenv').config();

router.get('/me', auth, async (req,res)=>{
    try{
        const user = await User.findOne({
            email: req.user.email
        });

        res.send(user)
    }
    catch(e){
        res.send({
            message: e.message
        })
    }
});

router.post('/register', async (req,res)=>{
    try{
        const {name, email, password, public_address} = req.body;
        const user = new User({name, email, password, public_address});

        const response = await user.save();

        res.status(200).send(response);
    }
    catch(e){
        res.status(400).send({
            message: e.message
        })
    }
});

router.post('/login', async (req, res)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user)
            throw new Error('No User Found!!!');
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch)
            throw new Error('Wrong Password');
        
        const token = await jwt.sign({email: email}, process.env.SECRET_TOKEN);

        res.status(200).send({token});
    }
    catch(e){
        res.status(400).send({
            message: e.message
        })
    }
});

module.exports = router;