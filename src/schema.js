const { makeExecutableSchema } =require('graphql-tools');
const { ApolloServer, gql } = require('apollo-server-express');
const { Pool } = require('pg');


//Resolver Setup for GQL schema - including test database
const URI = 'postgres://yjmnkrxd:AXHzChrA4_EG_6NIYlDlLMjXVi2WERwO@raja.db.elephantsql.com:5432/yjmnkrxd'; // <<<< DB URL GOES HERE 

const pool = new Pool({
connectionString: URI,
ssl: true,
})

pool.connect((err, client, done) => {
if (err) return console.log(`Error connecting to db, ${err}`);
console.log('Connected to db 😄')
done();
})

const resolvers = {
    Query: {
        getAllAuthor() {
          const sql = `SELECT * FROM "Author";`;
          return pool.query(sql)
            .then(res => res.rows)
            .catch(err => console.error('Error is: ', err));
        },
        getAuthor(parent, args, context, info) {
          let sql = `SELECT * FROM "Author"`;
          let whereClause = ` WHERE `;
          Object.keys(args).forEach((fieldName, i , arr) => {
            whereClause += `"${fieldName}" = '${args[fieldName]}'`;
            if (i !== arr.length - 1) whereClause += ` AND `;
            else whereClause += `;`;
          });
          sql += whereClause;
          return pool.query(sql)
            .then(res => res.rows)
            .catch(err => console.error('Error is: ', err));
        },
        getAllBooks() {
          const sql = `SELECT * FROM "Books";`;
          return pool.query(sql)
            .then(res => res.rows)
            .catch(err => console.error('Error is: ', err));
        },
        getBooks(parent, args, context, info) {
          let sql = `SELECT * FROM "Books"`;
          let whereClause = ` WHERE `;
          Object.keys(args).forEach((fieldName, i , arr) => {
            whereClause += `"${fieldName}" = '${args[fieldName]}'`;
            if (i !== arr.length - 1) whereClause += ` AND `;
            else whereClause += `;`;
          });
          sql += whereClause;
          return pool.query(sql)
            .then(res => res.rows)
            .catch(err => console.error('Error is: ', err));
        },
    },
    
    Author: {
        id: (parent, args, context, info) => {
            return parent.id;
        },
        first_name: (parent, args, context, info) => {
            return parent.first_name;
        },
        last_name: (parent, args, context, info) => {
            return parent.last_name;
        },
    },

    Books: {
        id: (parent, args, context, info) => {
            return parent.id;
        },
        name: (parent, args, context, info) => {
            return parent.name;
        },
        author: (parent, args, context, info) => {
            return parent.author;
        },
    },
};

//Type Definitions for gql schema

const typeDefs = gql`
    type Author {
        id: ID
        first_name: String
        last_name: String
    }

    type Books {
        id: ID
        name: ID
        author: ID
    }

    type Query {
        getAllAuthor: [Author]
        getAuthor(
        id: ID,
        first_name: String,
        last_name: String
        ): [Author]
        getAllBooks: [Books]
        getBooks(
        id: ID,
        name: ID,
        author: ID
        ): [Books]
    }
`


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});