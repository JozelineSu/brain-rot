/**
 * username, user icon, password, likes, comments, posts, chasracters, lists
 */
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post',
        }
    ],
    characters: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Character',
        }
    ],

});
// 
/**(mongoose)pre middleware functions are executed one after another when each middlware calls next */
//set up pre-ssave middlware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {// checks if password has been modified
        //bcrypt incorporates a random number called a salt, unique to ea password as it attached to tit before hasing the combined value password+salt is passed to the hashing function
        // hasing turns requlare password into a fixed-length string of characters that apper random on meaningless
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

//compare icnoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
