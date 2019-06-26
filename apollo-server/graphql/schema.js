const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Author {
    id: ID
    first_name: String!
    last_name: String!
    books: Books
  }

  type Books {
    id: ID
    name: String!
    author: Author
  }

  type Query {
    getAllAuthor: [Author]
    getAuthor(
      id: ID,
      first_name: String,
      last_name: String,
      book_id: ID
    ): [Author]
    getAllBooks: [Books]
    getBooks(
      id: ID,
      name: String,
      author_id: ID
    ): [Books]
  }

`;

module.exports = typeDefs;
