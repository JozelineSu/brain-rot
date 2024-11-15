const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhh';
const expiration = '2h';

module.exports = {
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    }),
    authMiddleware: function({ req }) {
        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // we split the token string into an array and return actual token
        if (req.header.authorization) {
            token = token.spilt(' ').pop().trim(); // split() divides a strin into an array of substrings based on specific separator,pop()removes last element of array and returns it, trim() removes whitespace from start and end of a string
        }

        if (!token) {
            return req;
        }

        // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });//verifys token w/ secret key to
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        // return the req object so it can be passed to the resolver as 'context
        return req;
    },
    signToken: function ({ email, name, _id }) {
        const payload = { email, name, _id}; //identifying info of the user
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration }); //returns token containging userdata
    },
};

//we get our jwt token from this :)