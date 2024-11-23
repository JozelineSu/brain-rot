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
            replies {
                _id
                replyText
            }
        }
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
                replies {
                    _id
                    replytext
                }
            }
        }
    }
`;

export const ADD_REPLY  = gql `
    mutation addReply($postId: ID!, $commentId: ID!, $replyText: String!) {
        addReply(postId: $postId, commentId: $commentId, replyText: $replyText) {
            _id
            postText
            postAuthor
            createdAt
            comments {
                _id
                commentText
                createdAt
                replies {
                    _id
                    replyText
                    createdAt
                }
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