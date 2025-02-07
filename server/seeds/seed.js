const db = require('../config/connection');
const { User, Post, Character} = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
const characterSeeds = require('./characterSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Post', 'posts');

    await cleanDB('Character', 'characters');
    await cleanDB('Tag', 'tags');
    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < postSeeds.length; i++) {
      const { _id, postAuthor } = await Post.create(postSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: postAuthor },
        {
          $addToSet: {
            posts: _id,
          },
        }
      );
    }

    for (let i = 0; i < characterSeeds.length; i++) {
      const { _id, characterAuthor } = await Character.create(characterSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: characterAuthor },
        {
          $addToSet: {
            characters: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});