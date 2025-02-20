import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password:String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
      }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
            _id
            username
            }
        }
    }
`;

export const ADD_TAG = gql`
    mutation addTag($tagText: String!) {
        addTag(tagText: $tagText) {
            _id
            tagText
        }
    }
`

export const ADD_POST = gql`
    mutation addPost($postText: String!, $tags: [String]) {
        addPost(postText: $postText, tags: $tags) {
        _id
        postText
        postAuthor
        createdAt
        comments {
            _id
            commentText 
        }
        tags {
            _id
            tagText
        }
      }
    }
`;

export const REMOVE_POST = gql`
    mutation removePost($postId: ID!) {
        removePost(postId: $postId) {
            _id
        }
    }
`;

export const REMOVE_CHARACTER = gql`
    mutation removeCharacter($characterId: ID!) {
        removeCharacter(characterId: $characterId) {
            _id
        }
    }
`;

export const UPDATE_POST = gql`
    mutation updatePost($postId: ID!, $postText: String!, $tags: [String]) {
        updatePost(postId: $postId, postText: $postText, tags: $tags) {
            _id
            postText
            postAuthor
            createdAt
            comments {
                _id
                commentText 
            }
            tags {
                _id
                tagText
            }
        }
    }
`;

export const UPDATE_CHARACTER = gql`
    mutation updateCharacter($characterId: ID!, $description: String!, $characterName: String!) {
        updateCharacter(characterId: $characterId, description: $description, characterName: $characterName) {
            _id
            description
            characterName
            characterAuthor
            createdAt
        }
    }
`;

export const ADD_COMMENT  = gql `
    mutation addComment($postId: ID!, $commentText: String!) {
        addComment(postId: $postId, commentText: $commentText) {
            _id
            postText
            postAuthor
            createdAt
            comments {
                _id
                commentText
                createdAt
            }
        }
    }
`;

export const ADD_CHARACTER = gql`
    mutation addCharacter($characterName: String!, $description: String!) {
        addCharacter(characterName: $characterName, description: $description) {
            _id
            characterName
            description
            characterAuthor
            createdAt
        }
    }
`;