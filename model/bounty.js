const mongoose = require('mongoose');
const {Schema} = mongoose;

const bountySchema = Schema({
    name: String,
    email: String,
    reward: Number,
    content: String,
    limit: Date,
    owner: String
},{
    timestamps: true
});

const Bounty = mongoose.model('Bounty', bountySchema);

module.exports = Bounty;