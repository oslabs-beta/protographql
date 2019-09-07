const pool = require('./sqlPool');

const tableQuery = `
    SELECT table_name,
        ordinal_position as position,
        column_name,
        data_type,
        is_nullable,
        column_default as default_value
    FROM information_schema.columns
    WHERE table_schema not in ('information_schema', 'pg_catalog') AND
        table_name not in ('pg_stat_statements')
    ORDER BY table_schema, 
        table_name,
        ordinal_position;`;

const constraintQuery = `
    SELECT table_name,
        column_name,
        constraint_name
    FROM information_schema.constraint_column_usage
    WHERE table_schema not in ('information_schema', 'pg_catalog') AND
        table_name not in ('pg_stat_statements')
    ORDER BY table_name;`

let tableColumns = {};

function Column(name, data_type, position, is_nullable, constraint){
    this.name = name;
    this.data_type = data_type;
    this.position = position;
    this.is_nullable = is_nullable;
    this.constraint = constraint;
}

pool.query(tableQuery)
    .then(res => {
        console.log('tableQuery: ',res.rows)
        // const result = res.rows;
        // for(let item of result){
        //     let table = item.table_name;
        //     if(!tableColumns[table]){
        //         tableColumns[table] = [];
        //     }
        //     item = new Column(item.column_name, item.data_type, item.position, item.is_nullable)
        //     tableColumns[table].push(item)
        // }
        tableColumns = res.rows;
        // console.log("table column obj: ", tableColumns)
        return tableColumns;
    })
    .then((tableColumns) => { pool.query(constraintQuery)
        .then(res => {
            // console.log('constraintQuery: ',res.rows)
            const result = res.rows;
            for(let item of result){
                // console.log("tablecolumns: ", tableColumns)
                let table = item.table_name;
                let col = item.column_name;
                for(let column of tableColumns){
                // console.log('column: ', column, "col: ", col)
                    if(column.table_name == table && column.column_name == col){
                        console.log("true??")
                        column.constraint = item.constraint_name;
                    }
                }
            }
            // console.log('final table column obj: ', tableColumns)
        })
        .catch(err => console.error('Error is: ', err))
    })
    .catch(err => console.error('Error is: ', err)) 

console.log(tableColumns)
    
// console.log("tableRes: ", tableRes)
