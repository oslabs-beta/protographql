const tables = {
    0: {
      type: 'Author',
      fields: {
        0: {
          name: 'id',
          type: 'ID',
          primaryKey: true,
          autoIncrement: true,
          unique: true,
          required: false,
          multipleValues: false,
          defaultValue: '',
          relationSelected: false,
          relation: {
            tableIndex: -1,
            fieldIndex: -1,
            refType: ''
          },
          tableNum: 0,
          fieldNum: 0,
          refBy: {},
          queryable: false
        },
        1: {
          name: 'first_name',
          type: 'String',
          primaryKey: false,
          autoIncrement: false,
          unique: false,
          required: true,
          multipleValues: false,
          defaultValue: '',
          relationSelected: false,
          relation: {
              tableIndex: -1,
              fieldIndex: -1,
              refType: ''
          },
          tableNum: 0,
          fieldNum: 1,
          refBy: {},
          queryable: false
        },
        2: {
          name: 'last_name',
          type: 'String',
          primaryKey: false,
          autoIncrement: false,
          unique: false,
          required: true,
          multipleValues: false,
          defaultValue: '',
          relationSelected: false,
          relation: {
              tableIndex: -1,
              fieldIndex: -1,
              refType: ''
          },
          tableNum: 0,
          fieldNum: 2,
          refBy: {},
          queryable: false
        }
      },
      fieldIndex: 3,
      tableID: 0
    },
    1: {
      type: 'Books',
      fields: {
        0: {
          name: 'id',
          type: 'ID',
          primaryKey: true,
          autoIncrement: true,
          unique: true,
          required: false,
          multipleValues: false,
          defaultValue: '',
          relationSelected: false,
          relation: {
              tableIndex: -1,
              fieldIndex: -1,
              refType: ''
          },
          tableNum: 1,
          fieldNum: 0,
          refBy: {},
          queryable: true
        },
        1: {
          name: 'name',
          type: 'String',
          primaryKey: false,
          autoIncrement: false,
          unique: false,
          required: true,
          multipleValues: false,
          defaultValue: '',
          relationSelected: false,
          relation: {
              tableIndex: -1,
              fieldIndex: -1,
              refType: ''
          },
          tableNum: 1,
          fieldNum: 1,
          refBy: {},
          queryable: true
        },
        2: {
          name: 'author_id',
          type: 'ID',
          primaryKey: false,
          autoIncrement: false,
          unique: false,
          required: true,
          multipleValues: false,
          defaultValue: '',
          relationSelected: true,
          relation: {
              tableIndex: '0',
              fieldIndex: '0',
              refType: 'many to one'
          },
          tableNum: 1,
          fieldNum: 2,
          refBy: {},
          queryable: true
        }
      },
      fieldIndex: 3,
      tableID: 1
    },
  };

const commas = (arrayOfProperties) => {
    let totalProps = 0;
    for(let i = 0; i < 6; i++){
        if(arrayOfProperties[i]){
            totalProps++;
        }
    }
    return totalProps;
}

const showFields = (tableObj,fieldIdxArr, tables) => {
  const totalFields = tableObj.fieldIndex;
  let foreignKey = false;
  let output = ``
  for(let field = 0; field < totalFields; field++){
    if(fieldIdxArr[field]){
      let propertyArr = Object.values(fieldIdxArr[field])
        if(propertyArr[0].length > 0) output += `\n  "${propertyArr[0]}": ${propertyArr[1]}`;
        if(propertyArr[3]) output += ` SERIAL`
        if(propertyArr[2]) output += ` PRIMARY KEY`;
        if(propertyArr[4]) output += ` UNIQUE`;
        if(propertyArr[5]) output += `!`;
        if(propertyArr[8]) {
          if(propertyArr[9].tableIndex > -1 && tables[propertyArr[9].tableIndex]) {
            output += ` REFERENCES ${tables[propertyArr[9].tableIndex].type} `;
            if(tables[propertyArr[9].tableIndex].fields[propertyArr[9].fieldIndex]){
              output += `(${tables[propertyArr[9].tableIndex].fields[propertyArr[9].fieldIndex].name})`
            }
          }
        foreignKey = true;
          // output += `);\n\n ALTER TABLE '${tables[propertyArr[10]].type}' ADD CONSTRAINT '${tables[propertyArr[9].tableIndex].type}';`;
        }
      }
    }
    if(!foreignKey){
      output += `);`
    }
    return output;
  }
  // const foreignKeyChecker = () =>{
  // }

const buildSQLScripts = input => {
const tables = Object.values(input); // array with actual table objects
let output = ``;
tables.forEach((table,idx) => {
    if(idx > 0){
    const tableName = table.type;
    output += `\n\n CREATE TABLE "${tableName}" (`
    const fieldObjs = Object.values(table.fields); // array of field properties per table
    output += showFields(table,fieldObjs,tables);
    }else{
    const tableName = table.type;
    output += `CREATE TABLE "${tableName}" (`
    const fieldObjs = Object.values(table.fields); // array of field properties per table
    output += showFields(table,fieldObjs,tables);
    }
})
return output;
}
 
console.log(buildSQLScripts(tables))
