/**
 * username, usericon, date, post text, image, tags, likes, comments, reposts??
 */
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema (
    {
        postText: {
            type: String,
            required: true,
        },
        postAuthor: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) =>dateFormat(timestamp),
        },
        comments: [{
            commentText: {
                type: String,
                required: true,
            },
            commentAuthor: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
              },
            replies: [{
                replyText: {
                    type: String,
                    required: true,
                },
                replyAuthor: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                    get: (timestamp) => dateFormat(timestamp),
                  },
            }],
        }]

    }
)

const Post = model('post', postSchema);

module.exports = Post;