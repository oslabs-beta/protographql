
/**********************************    HELPER FUNCTIONS    **********************************/


// Checks all fields of a table and returns an array of queryable fields
const queryableFieldsArrayCreator = fields => {
  const queryFieldsArray = [];
  for(let x in fields) {
    if (fields[x].queryable) {
      queryFieldsArray.push(fields[x])
    }
  }
  return queryFieldsArray
}

const fieldNameType = fields => {
  let fieldJson =``
  for(let i = 0; i < fields.length; i++) {
    fieldJson += `{"name":"${fields[i].name}", "type":"${fields[i].type}"}`
    if (i !== fields.length - 1) {
      fieldJson += `,`
    }
  }
  return fieldJson;

}

/**********************************    BUILD JSON FOR VISUALIZER    **********************************/

export const buildVisualizerJson = tables => {
  let root = `{"name":"Queries"`
  
  //if we have no tables return only root
  if (Object.keys(tables).length === 0) return root +='}'

  const tableArray = Object.values(tables)
  const queryableTableArray = [] 
  tableArray.forEach( el => {
    //get list of fields that are queryable for current table ("el")
    const queryableFields = queryableFieldsArrayCreator(el.fields)

    /*if there is at least one queryable field in the table, update the tables fields to only the queryable fields and push to queryableTableArray */
    if (queryableFields.length !== 0) {
      el.fields = queryableFields
      queryableTableArray.push(el)
    }
  })

  //If there are no queryable fields return root
  if (queryableTableArray.length === 0) return root +='}'

  root += `, "children":[`
  for (let i = 0; i < queryableTableArray.length; i++) {
    //get All
      root += `{"name":"getAll${queryableTableArray[i].type}","type":"[${queryableTableArray[i].type}]","children":[{"name":"${queryableTableArray[i].type}","type":"[${queryableTableArray[i].type}]"}]},`

    //get
    root += `{"name": "get${queryableTableArray[i].type}","type":"[${queryableTableArray[i].type}]","children":[{"name": "${queryableTableArray[i].type}","type": "[${queryableTableArray[i].type}]","children": [${fieldNameType(queryableTableArray[i].fields)}]}]}`

    if (i !== queryableTableArray.length - 1) root += `,`
  }
  root += `]}`
  return root
}