import buildGQLObjTypes from './buildGQLObjTypes';
import buildGQLQueryType from './buildGQLQueryType';
import buildGQLInputTypes from './buildGQLInputTypes';
import buildGQLMutationTypes from './buildGQLMutationTypes';

// Build GQL Schema code
const buildGQLSchema = tables => {
  // User must npm install 'apollo-server' or 'apollo-server-express'
  const requireApolloServer = `const { gql } = require('apollo-server-express');\n\n`;
  const typeDefs = `const typeDefs = gql\`\n\n${buildGQLObjTypes(tables)}${buildGQLInputTypes(tables)}${buildGQLMutationTypes(tables)}${buildGQLQueryType(tables)}\n\`;\n\n`
  const moduleExports = `module.exports = typeDefs;\n`
  return requireApolloServer + typeDefs + moduleExports;
}

export default buildGQLSchema;
