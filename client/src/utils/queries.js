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

export const QUERY_TAGS = gql`
    query getTags {
        tags {
            _id
            tagText
            posts {
                _id
                postText
                postAuthor
                createdAt
            }
        }    
    }
`

export const QUERY_POSTS = gql`
    query getPosts {
        posts {
            _id
            postText
            postAuthor
            createdAt 
            tags {
                _id
                tagText
            }
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
    query getSinglePost($postId: ID) {
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
            }
            tags {
                _id
                tagText
            }
        }
    }
`;

export const SEARCH_TAGS = gql`
    query searchTags($tagText: String!) {
        searchTags(tagText: $tagText) {
           
                _id
                postText
                postAuthor
                createdAt
                tags {
                    _id
                    tagText
                }
            
        }
    }
`

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