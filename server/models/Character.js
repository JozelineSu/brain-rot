/**
 * image,name desc
 */
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const characterSchema = new Schema({
    characterName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    characterAuthor: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) =>dateFormat(timestamp),
    },
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag', // Reference to Tag model
        },
    ],
});

const Character = model('Character', characterSchema);

module.exports = Character;