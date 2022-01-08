const router = require('express').Router();
const Submission = require('../model/submission');
const auth = require('../middleware/auth');
require('dotenv').config();

router.get('/all', async (req, res)=>{
    try{
        const bounties = await Bounty.find();
        res.status(200).send(bounties);
    }
    catch(e){
        res.statud(400).send({
            message: e.message
        });
    }
});

router.get('/owned', auth, async (req, res)=>{
    try{
        const bounties = await Bounty.find({
            email: req.user.email
        });
        res.status(200).send(bounties);
    }
    catch(e){
        res.status(400).send({
            message: e.message
        });
    }
});

module.exports = router;