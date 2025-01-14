const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const tagSchema = new Schema (
    {
        name: {
            type: String,
            unique: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        }
    }
)

const Tag = model('Tag', tagSchema);

module.exports = Tag;