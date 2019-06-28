
/**********************************    HELPER FUNCTIONS    **********************************/


// Checks all fields of a table and returns an array of queryable fields
export const queryableFieldsArrayCreator = fields => {
  const queryFieldsArray = [];
  for(let x in fields) {
    if (fields[x].queryable) {
      queryFieldsArray.push(fields[x])
    }
  }
  return queryFieldsArray
}

//Check all fields of a table and return objects with the fields name and type
export const fieldNameType = fields => {
  let fieldJson =``
  for(let i = 0; i < fields.length; i++) {
    fieldJson += `{"name":"${fields[i].name}", "type":"${fields[i].type}"}`
    if (i !== fields.length - 1) {
      fieldJson += `,`
    }
  }
  return fieldJson;

}

export const queryableTableMaker = tables => {
    if (Object.keys(tables).length === 0) return []

    const tableArray = Object.values(tables)
    const queryableTables = [] 
    tableArray.forEach( el => {
      //get list of fields that are queryable for current table ("el")
      const queryableFields = queryableFieldsArrayCreator(el.fields)
  
      /*if there is at least one queryable field in the table, update the tables fields to only the queryable fields and push to queryableTableArray */
      if (queryableFields.length !== 0) {
        el.fields = queryableFields
        queryableTables.push(el)
      }
    })
    return queryableTables
}

export function queryTypeCreator (tables) {
  const queryableTables = queryableTableMaker(tables)
  const typeArray = [];
  for (let i in queryableTables) {
    const curr = queryableTables[i]
    const fields = curr.fields
    const type = {}
    type.name = curr.type
    type.fields = {}
    for (let j in fields) {
      if (fields[j].relationSelected) {
        type.fields[tables[fields[j].relation.tableIndex].type] = `[${tables[fields[j].relation.tableIndex].type}]`
      }
      type.fields
      if (!fields[j].relationSelected) {
        type.fields[fields[j].name] = fields[j].type
      }
    }
    typeArray.push(type)
  }
  return typeArray
}

/**********************************    BUILD JSON FOR VISUALIZER    **********************************/

export const buildVisualizerJson = tables => {
  let root = `{"name":"Queries"`
  
  //if we have no tables return only root
  if (Object.keys(tables).length === 0) return JSON.parse(root +='}')

  const queryableTableArray = queryableTableMaker(tables)

  //If there are no queryable fields return root
  if (queryableTableArray.length === 0) return JSON.parse(root +='}')

  //Building children of root query
  root += `, "children":[`
  for (let i = 0; i < queryableTableArray.length; i++) {
    //get All query
      root += `{"name":"getAll${queryableTableArray[i].type}","type":"[${queryableTableArray[i].type}]","children":[{"name":"${queryableTableArray[i].type}","type":"[${queryableTableArray[i].type}]"}]},`

    //get query
    root += `{"name": "get${queryableTableArray[i].type}","type":"[${queryableTableArray[i].type}]","children":[{"name": "${queryableTableArray[i].type}","type": "[${queryableTableArray[i].type}]","children": [${fieldNameType(queryableTableArray[i].fields)}]}]}`

    if (i !== queryableTableArray.length - 1) root += `,`
  }
  root += `]}`
  return JSON.parse(root)
}