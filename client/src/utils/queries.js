import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            posts {
                _id
                postText
                createdAt
            }
            characters {
                _id
                characterName
                description
                createdAt
            }
        }
    }
`;

export const QUERY_POSTS = gql`
    query getPosts {
        posts {
            _id
            postText
            postAuthor
            createdAt
        }
    }
`;

export const QUERY_CHARACTERS  = gql`
    query getCharacters {
        characters {
            _id
            characterName
            description
            characterAuthor
            createdAt
        }
    }
`

export const QUERY_SINGLE_POST = gql`
    query getSinglePost($postId: ID!) {
        post(postId: $postId) {
            _id
            postText
            postAuthor
            createdAt
            comments {
                _id
                commentText
                commentAuthor
                createdAt
                replies {
                    _id
                    replyText
                    replyAuthor
                    createdAt
                }
            }
        }
    }
`;

export const QUERY_SINGLE_CHARACTER = gql`
    query getSingleCharacter($characterId: ID!) {
        character(characterId: $characterId){
            _id
            characterName
            description
            characterAuthor
            createdAt
        }
    }
`

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            posts {
                _id
                postText
                postAuthor
                createdAt
            }
            characters {
                _id
                characterName
                description
                characterAuthor
                createdAt
            }
        }
    }
`