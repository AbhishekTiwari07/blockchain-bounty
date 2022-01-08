const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

const userSchema = Schema({
    name : String,
    email: String,
    public_address: String,
    password: String
},{
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if(this.isModified('password'))
        this.password = await bcrypt.hash(this.password,8);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;