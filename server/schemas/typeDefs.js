const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]!
    characters: [Character]!
}

type Character {
    _id: ID
    characterName: String
    description: String
    characterAuthor: String
    createdAt: String
}

type Post {
    _id: ID
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]!
}

type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]    
    user(username: String!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
    characters(username: String!): [Character]
    character(characterId: ID!): Character
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postText: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    addCharacter(characterName: String!, description: String!): Character
    removePost(postId: ID!): Post
    updatePost(postId: ID!, postText: String!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    removeCharacter(characterId: ID!): Character
}

`;

module.exports = typeDefs;