const { Schema, model } = require('mongoose');

const tagSchema = new Schema (
    {
        tagText: {
            type: String,
            unique: true,
            trim: true,
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'post',
            }
        ],
    }
)

const Tag = model('Tag', tagSchema);

module.exports = Tag;