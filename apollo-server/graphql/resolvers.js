const pool = require('../db/sqlPool');

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
      Object.keys(args).forEach((fieldName, i, arr) => {
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

}

module.exports = resolvers;