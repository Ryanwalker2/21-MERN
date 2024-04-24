const typeDefs = `
  type Query {
    user: [User]
    books: [Book]
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
`;


module.exports = typeDefs;
