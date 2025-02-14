const { User, Post, Character, Tag } = require('../models');
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
            return Post.find(params).sort({ createdAt: -1 }).populate('tags');
        },
        post: async (parent, { postId }) => {
            return Post.findOne({ _id: postId }).populate('tags');
        },
        characters: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Character.find(params).sort({ createdAt: -1 }).populate('tags');
        },
        character: async (parent, { characterId }) => {
            return Character.findOne({ _id: characterId}).populate('tags');
        },
        tags: async () => {
            return Tag.find().populate('posts');
        },
        searchTags: async (parent, { tagText }) => {
            try {
                const tag = await Tag.findOne({ tagText }).populate({
                    path: "posts",
                    populate: { path: "tags"}
                });
        
                if (!tag) {
                    console.log("no posts found");
                    return { posts: [] }; // Return empty if no tag found
                    
                }

                const validPosts = tag.posts?.filter(post => post) || [];

                
                return validPosts;
            } catch (error) {
                console.error("Error searching tags:", error);
                throw new Error("Failed to fetch posts for the given tag");
            }
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
        addTag: async (parent, { tagText }, context) => {
            if (!tagText.trim()) {
                throw new Error("Tag text cannot be empty");
            }
        
            const tag = await Tag.findOneAndUpdate(
                { tagText: tagText.trim() }, // Find by tagText
                { $setOnInsert: { tagText: tagText.trim() } }, // Only insert if it doesn’t exist
                { new: true, upsert: true } // Return the document & create if not found
            );
        
            return tag;
        },
        
        
        addPost: async (parent, { postText, tags = [] }, context) => {
            if (!context.user) throw AuthenticationError;

            const tagIds = await Promise.all(
                tags.map(async (tagName) => {
                    let tag = await Tag.findOne({ tagText: tagName});
                    if (!tag) {
                        tag = await Tag.create({ tagText: tagName });
                    }
                    return tag._id;
                })
            );

            const post = await Post.create({
                postText,
                tags: tagIds,
                postAuthor: context.user.username
            });

            await Tag.updateMany(
                {_id: { $in: tagIds }},
                { $addToSet: { posts: post._id}}
            );

            await User.findOneAndUpdate(
                {_id: context.user._id},
                {$addToSet: { posts: post._id}}
            );

            return post.populate("tags");
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
        addCharacter: async (parent, { characterName, description, tags = [] }, context) => {
            if (context.user) {
                const tagIds = await Promise.all(
                    tags.map(async (tagName) => {
                        let tag = await Tag.findOne({ name: tagName });
                        if (!tag) {
                            tag = await Tag.create({ name: tagName });
                        }
                        return tag._id;
                    })
                );
                const character = await Character.create({
                    characterName,
                    description,
                    tags: tagIds,
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
        updatePost: async (parent, { postId, postText, tags = []}, context) => {
            if (context.user) {
                const tagIds = await Promise.all(
                    tags.map(async (tagName) => {
                        let tag = await Tag.findOne({ name: tagName });
                        if (!tag) {
                            tag = await Tag.create({ name: tagName });
                        }
                        return tag._id;
                    })
                );

                const post = await Post.findOneAndUpdate(
                    { _id: postId,
                      postAuthor: context.user.username
                    },
                    { $set: {postText, tags: tagIds}},
                    { new: true }
                );

                return post;
            }
            throw AuthenticationError;
        },
        updateCharacter: async (parent, { characterId, characterName, description, tags = []}, context) => {
            if (context.user) {
                const tagIds = await Promise.all(
                    tags.map(async (tagName) => {
                        let tag = await Tag.findOne({ name: tagName });
                        if (!tag) {
                            tag = await Tag.create({ name: tagName });
                        }
                        return tag._id;
                    })
                );

                const character = await Character.findOneAndUpdate(
                    {_id: characterId,
                    characterAuthor: context.user.username
                    },
                    { $set: {characterName, description, tags: tagIds}},
                    { new: true }
                );
                return character;
            }
            throw AuthenticationError;
        },
        removeCharacter: async (parent, { characterId }, context) => {
            if (context.user) {
                const character = await Character.findOneAndDelete({
                    _id: characterId,
                    characterAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
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