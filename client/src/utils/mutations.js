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

export const ADD_POST = gql`
    mutation addPost($postText: String!) {
        addPost(postText: $postText) {
        _id
        postText
        postAuthor
        createdAt
        comments {
            _id
            commentText 
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

`

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