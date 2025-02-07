const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]!
    characters: [Character]!
}

type Tag {
    _id: ID
    tagText: String
    posts: [Post]!
}

type Character {
    _id: ID
    characterName: String
    description: String
    characterAuthor: String
    createdAt: String
    tags: [Tag]
}

type Post {
    _id: ID
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]!
    tags: [Tag]
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
    tags: [Tag]
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTag(tagText: String!): Tag
    addPost(postText: String!, tags: [String]): Post
    addComment(postId: ID!, commentText: String!): Post
    addCharacter(characterName: String!, description: String!, tags: [String]): Character
    removePost(postId: ID!): Post
    updatePost(postId: ID!, postText: String!, tags: [String]): Post
    removeComment(postId: ID!, commentId: ID!): Post
    removeCharacter(characterId: ID!): Character
    updateCharacter(characterId: ID!, characterName: String!, description: String!, tags: [String]): Character
}

`;

module.exports = typeDefs;