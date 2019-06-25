const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const express = require('express');
const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app }); 

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
