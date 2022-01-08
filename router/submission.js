const router = require('express').Router();
const Submission = require('../model/submission');
const auth = require('../middleware/auth');
require('dotenv').config();

router.get('/all', async (req, res)=>{
    try{
        const submission = await Submission.find();
        res.status(200).send(submission);
    }
    catch(e){
        res.statud(400).send({
            message: e.message
        });
    }
});

router.get('/owned', auth, async (req, res)=>{
    try{
        const submission = await Submission.find({
            email: req.user.email
        });
        res.status(200).send(submission);
    }
    catch(e){
        res.status(400).send({
            message: e.message
        });
    }
});

module.exports = router;