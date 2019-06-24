const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Author {
    id: ID
    first_name: String!
    last_name: String!
  }

  type Books {
    id: ID
    name: String!
    author: Author
  }

  type Query {
    getAllAuthor: [Author]
    getAllBooks: [Books]
    getBooks(
      id: ID,
      name: String,
      author_id: ID
    ): [Books]
  }

`;

module.exports = typeDefs;