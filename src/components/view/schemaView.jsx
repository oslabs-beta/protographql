import React from 'react';
import SchemaTable from './schemaTable'

const SchemaView = ({ tables, setTables, setPopUp, view }) => {
 const tablesArray = Object.keys(tables).map(tableKey => (
   <SchemaTable 
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