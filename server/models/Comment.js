/**
 * username,usericon?, comment text, date, reppies,, likes
 * dont know if i want a model for this might just add it to post 
 */
const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    comment: {
        type: String,
        required: true,
    },
    replies: [{
        type: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    }]
});

const Comment = model('Comment', commentSchema);


