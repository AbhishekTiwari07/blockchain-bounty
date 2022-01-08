const express = require('express');
const user = require('./router/user');
const bounty = require('./router/bounty');
require('dotenv').config();
require('./db/db')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/user', user);
app.use('/bounty', user);

app.listen(PORT, err => {
    if(err){
        console.log(err.message);
        return ;
    }
    console.log(`Server is up at ${PORT}`)
})