const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const express = require('express');
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: 3000 }, () => {
  console.log('ProtoGraphQL is ready for use at http://localhost:3000 🚀')
});