const { User, Post, Character } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        /**i want to get user, get posts, get characters */
        users: async () => {
            return User.find().populate('posts').populate('characters');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('posts').populate('characters');
        },
        posts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Post.find(params).sort({ createdAt: -1 });
        },
        post: async (parent, { postId }) => {
            return Post.findOne({ _id: postId });
        },
        characters: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Character.find(params).sort({ createdAt: -1 });
        },
        character: async (parent, { characterId }) => {
            return Character.findOne({ _id: characterId});
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('posts').populate('characters');
            }
            throw AuthenticationError;
        }
    },
/**add user(signup) login, add/delete/edit post , add/delete commentadd/delete/edit character */
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
            
        },
        addPost: async (parent, { postText }, context) => {
            if (context.user) {
                const post = await Post.create({
                    postText,
                    postAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
                    {_id: context.user._id },
                    { $addToSet: { posts: post._id} }
                );

                return post;
            }
            throw AuthenticationError;
        },
        addComment: async (parent, { postId, commentText }, context) => {  
            if (context.user) {
                return Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $addToSet: {
                            comments: { commentText, commentAuthor: context.user.username},
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw AuthenticationError;
        },
        addCharacter: async (parent, { characterName, description }, context) => {
            if (context.user) {
                const character = await Character.create({
                    characterName,
                    description,
                    characterAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: { characters: character._id}}
                );

                return Character;
            }
            throw AuthenticationError;
        },
        removePost: async (parent, { postId }, context) => {
            if (context.user) {
                const post = await Post.findOneAndDelete({
                    _id: postId,
                    postAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id},
                    {$pull: { posts: post._id }}
                );

                return post;
            }
            throw AuthenticationError;
        },
        updatePost: async (parent, { postId, postText }, context) => {
            if (context.user) {
                const post = await Post.findOneAndUpdate(
                    { _id: postId,
                      postAuthor: context.user.username
                    },
                    { $set: {postText}},
                    { new: true }
                );

                return post;
            }
            throw AuthenticationError;
        },
        removeCharacter: async (parent, { characterId }, context) => {
            if (context.user) {
                const character = await Character.findOneAndDelete({
                    _id: characterId,
                    characterAuthor: context.user.username,
                });

                await User.findOneAndupdate(
                    {_id: context.user._id},
                    {$pull: { characters: character._id}}
                );

                return character;
            }
            throw AuthenticationError
        },
        removeComment: async (parent, { postId, commentId }, context) => {
            if ( context.user) {
                return Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $pull: {
                            comments: {
                                _id: commentId,
                                commentAuthor: context.user.username,
                            },
                        },
                    },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },

    },
}

module.exports = resolvers;