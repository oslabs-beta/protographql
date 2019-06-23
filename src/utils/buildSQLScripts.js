
const showFields = (tableObj,fieldIdxArr, tables) => {
  const totalFields = tableObj.fieldIndex;
  let foreignKey = false;
  let output = ``
  for(let field = 0; field < totalFields; field++){
    if(fieldIdxArr[field]){
      let propertyArr = Object.values(fieldIdxArr[field])
      if(propertyArr[0].length > 0) output += `\n  "${propertyArr[0]}"`;
      if(propertyArr[1] !== 'ID' && propertyArr[1] !== 'String'){ 
        output += ` ${propertyArr[1]}`}else if(propertyArr[1] === 'String'){
          output += ` VARCHAR(256)`
        }
      if(propertyArr[3] || propertyArr[1] ==='ID') output += ` SERIAL`;
      if(propertyArr[2]) output += ` PRIMARY KEY`;
      if(propertyArr[4]) output += ` UNIQUE`;
      if(propertyArr[5]) output += ` NOT NULL`;
      // if(propertyArr[8]) {
      //   if(propertyArr[9].tableIndex > -1 && tables[propertyArr[9].tableIndex]) {
      //     output += `);\n\n ${tables[propertyArr[10]].type} REFERENCES ${tables[propertyArr[9].tableIndex].type} `;
      //     if(tables[propertyArr[9].tableIndex].fields[propertyArr[9].fieldIndex]){
      //       output += `(${tables[propertyArr[9].tableIndex].fields[propertyArr[9].fieldIndex].name})`
      //     }
      //   }
      //   foreignKey = true;
        // output += `);\n\n ALTER TABLE '${tables[propertyArr[10]].type}' ADD CONSTRAINT '${tables[propertyArr[9].tableIndex].type}';`;
      // }
    }
    if(field < totalFields-1){ 
      output += `,`
    }else{
      output += `\n);`
    }
  }
  return output;
}

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

export default buildSQLScripts;
