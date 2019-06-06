import React from 'react';
import SchemaTable from './schemaTable'

const SchemaView = ({ tables, setTables, setPopUp, view }) => {
 const tablesArray = Object.keys(tables).map(tableKey => (
   <SchemaTable
    key={tableKey}
    tableKey={tableKey} 
    table={tables[tableKey]} 
    setTables={setTables} 
    setPopUp={setPopUp} 
    />
 ))
 
 return (
   <div>
     { tablesArray }
   </div>
 )
}

export default SchemaView