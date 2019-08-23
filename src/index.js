//added for apollo server playground
import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import { Pool } from 'pg';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import * as ReactApp from './index.jsx';

app = express();

app.use('/static', express.static(path.resolve(__dirname, 'public')))

// require("dotenv").config();

const URI = 'postgres://yjmnkrxd:AXHzChrA4_EG_6NIYlDlLMjXVi2WERwO@raja.db.elephantsql.com:5432/yjmnkrxd'


const pool = new Pool({
  connectionString: URI,
  ssl: true,
})

pool.connect((err, client, done) => {
  if (err) return console.log(`Error connecting to db, ${err}`);
  console.log('Connected to db 😄')
  done();
})

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
`

const resolvers = {
  Query: {
    getAllAuthor() {
      const sql = `SELECT * FROM "Author";`;
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
      const sql = `SELECT * FROM "Author" WHERE "id" = '${parent.author_id}';`;
      return pool.query(sql)
        .then(res => res.rows[0])
        .catch(err => console.error('Error is: ', err))
    },
  },
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

server.applyMiddleware({app});

app.get('/', (req, res) => {
  const component = ReactDOMServer.renderToString(<ReactApp />);

  const html = `
  <!DOCTYPE html>
    <html>

    <head>
      <meta charset="UTF-8" />
      <title>ProtoGraphQL</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
      <!-- Fonts to support Material Design -->
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" />
      <!-- Icons to support Material Design -->
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <!-- Roboto font -->
      <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
      <!-- icons library -->
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
        integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
      <link rel="stylesheet" href="./public/styles.css">
    </head>

    <body>
      <div id="root">${component}</div>
      <script src="./public/bundle.js"></script>
    </body>

    </html>
  `
  res.send(html)
});

app.get("/graphql", (req, res) => {
  res.send({hello: 'there!'})
})

app.listen({port: 8082}, () => {
  console.log(`🚀 Server ready at localhost:8082/graphql`);
});
