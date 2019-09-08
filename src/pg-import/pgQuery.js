const pool = require('./sqlPool');

const pgQuery = async function(fetchedTables) {
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


    let queryResults = await pool.query(tableQuery)
        .then(res => {
            console.log('tableQuery: ',res.rows)
            tableColumns = res.rows;
            return tableColumns;
        })
        .then((tableColumns) => { 
            return pool.query(constraintQuery)
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
                                column.constraint = item.constraint_name;
                            }
                        }
                    }
                    const tables = {};
                    let index = -1;
                    tableColumns.forEach((item) => {
                        //if table type matches index, do not create new table index
                        if(!tables[index] || tables[index].type !== item.table_name){
                            //increment index to move on to new table
                            index++
                            tables[index] = {};
                            tables[index].type = item.table_name;
                            tables[index].fields = {};
                            tables[index].fieldIndex = 0;
                            tables[index].tableID = index.toString();
                            tables[index].fields = [];
                        }
                        tables[index].fieldIndex ++;
                        
                        // tables[index].fields[position] = {};
                        const column = {};
                        column.name = item.column_name;
                        
                        //assigns column data types from Postgres to match our app's data types
                        switch(item.data_type){
                            case "character varying":
                                column.type = "String";
                                break;
                            case "integer":
                                column.type = "Int";
                                break;
                            case "serial":
                                column.type = "ID";
                                break;
                            case "boolean":
                                column.type = "Boolean"
                            }
                            column.required = item.is_nullable == "YES" ? true : false;
                            column.tableNum = index.toString();
                            column.fieldNum = item.position;
                            column.defaultValue = item.default_value ? item.default_value : "";
                            //values that need to be fetched from db
                            column.primaryKey = false;
                            column.unique = false;
                            column.relationSelected = false;
                            column.relation = {
                                tableIndex: -1,
                                fieldIndex: -1,
                                refType: ''
                            },
                            column.queryable = true;
                            
                            tables[index].fields.push(column)
                        })
                                    console.log("tables (pgquery): ", tables)
                                    fetchedTables = tables;
                                    return fetchedTables;
                                    // console.log('final table column obj: ', tableColumns)
            })
            
        })
        .catch(err => console.error('Error is: ', err)) 

    return queryResults;
}

module.exports = pgQuery;
    
// console.log("tableRes: ", tableRes)
