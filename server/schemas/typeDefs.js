const typeDefs = `
  type Query {
    users: [User]!
    user(username: String!): User
    books: [Book]!
    book(bookId: ID!): Book
    me: User
  }
  
  type User {
    username: String
    email: String
    savedBooks: [Book]
  }

  type Book {
    authors: String
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
   addUser(username: String!, email: String!, password: String!): Auth
   removeUser(userId: ID!): User 
   login(email: String!, password: String!): Auth
  }
`;


module.exports = typeDefs;
