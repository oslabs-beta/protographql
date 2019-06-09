import buildGQLObjTypes from './buildGQLObjTypes';
import buildGQLQueryType from './buildGQLQueryType';

// Build GQL Schema code
const buildGQLSchema = tables => {
  // User must npm install 'apollo-server' or 'apollo-server-express'
  const requireApolloServer = `const { gql } = require('apollo-server-express');\n`;
  const typeDefs = `const typeDefs = gql\`\n\n${buildGQLObjTypes(tables)}${buildGQLQueryType(tables)}\n\`;\n\n`
  const moduleExports = `module.exports = typeDefs;`
  return requireApolloServer + typeDefs + moduleExports;
}

export default buildGQLSchema;

