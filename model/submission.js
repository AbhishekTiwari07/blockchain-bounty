const mongoose = require('mongoose');
const {Schema} = mongoose;

const submissionSchema = Schema({
    name: String,
    email: String,
    content: String,
    owner: String,
    submission: [{
        type: Schema.Types.ObjectId,
        ref: "Submission"
    }],
    approved: [{
        type: Schema.Types.ObjectId,
        ref: "Submission"
    }]
},{
    timestamps: true
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;