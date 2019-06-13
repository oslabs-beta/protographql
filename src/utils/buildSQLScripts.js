import tabs from './tabs';

const buildSQLScripts = tables => {
    let tableObj = Object.values(tables); // array with actual table objects
    let output = `\n\n`;
    for(let i = 0; i < tableObj.length; i++){
        let tableType = tableObj[i].type;
        output += `\n\n CREATE TABLE "${tableType}" (`
        let fieldObjs = Object.values(tableObj[i].fields); // array of field Objects per table
        let req;
        let autoInc;
        let uniqu;
        let pk;
        var related;
        for(let j = 0; j < fieldObjs.length; j++){
            let relation = tables[parseInt(fieldObjs[j].relation.tableIndex)];
            let fieldType;
            fieldObjs[j].relationSelected ? related = `\nALTER TABLE '${tableType}' ADD CONTRAINT '${relation.type}' );` : related = '';
            fieldObjs[j].required ? req = `NOT NULL` : req = '';
            fieldObjs[j].autoIncrement && fieldObjs[j].type !== 'ID' ? autoInc = `SERIAL` : autoInc = '';
            fieldObjs[j].unique ? uniqu = `UNIQUE` : uniqu = '';
            fieldObjs[j].primaryKey ? pk = `PRIMARY KEY ('${tableType}')` : pk = '';
            if(fieldObjs[j].type === 'ID' && fieldObjs[j].autoIncrement) {
                fieldType = 'SERIAL';
            }else if(!fieldObjs[j].type){
                fieldType = ``;
            }else{
                fieldType = fieldObjs[j].type
            }
            output += `\n${tabs(2)} ${fieldObjs[j].name} ${fieldType} ${pk} ${autoInc} ${req} ${uniqu}`;
        }
        output += `);`
        output += `\n${related}`;
    } 
    return output;
}


// CREATE TABLE "Author" (
//     "id"  serial  UNIQUE,
//     "Name"  varchar,
//     CONSTRAINT Author_pk PRIMARY KEY ("id")
//   ) WITH (
//     OIDS=FALSE
//   );

// CREATE TABLE "Books" (
//     "id"  serial  UNIQUE,
//     "Title"  varchar,
//     "authorID"  varchar,
//     CONSTRAINT Books_pk PRIMARY KEY ("id")
//   ) WITH (
//     OIDS=FALSE
//   );

export default buildSQLScripts;
