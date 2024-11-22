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
    replies: [Reply]!
}

type Reply {
    _id: ID
    replyText: String
    replyAuthor: String
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
    addReply(postId: ID!, commentId: ID!, replyText: String!): Post
    addCharacter(characterName: String!, description: String!): Character
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    removeReply(post: ID!, commentId: ID!, replyId: ID!): Post
    removeCharacter(characterId: ID!): Character
}

`;

module.exports = typeDefs;