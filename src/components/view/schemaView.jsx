import React from 'react';
import SchemaTable from './schemaTable';
import styled from 'styled-components';
import deepClone from  '../../utils/deepClone';

/*-------------------- Styled Component --------------------*/

const View = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

/*-------------------- Functional Component --------------------*/

function SchemaView({ 
  tables, 
  setTables, 
  setPopUp, 
  setView, 
  setSelectedTable 
}) {

  const deleteTable = id => {
    const newTables = deepClone(tables);
    delete newTables[id];
    setTables(newTables);
  }

  const tablesArray = Object.keys(tables).map(tableKey => (
    <SchemaTable
      tables={tables}
      key={tableKey}
      tableKey={tableKey}
      table={tables[tableKey]}
      setTables={setTables}
      setPopUp={setPopUp}
      setView={setView}
      style={{ margin: "10px" }}
      deleteTable={deleteTable}
      setSelectedTable={setSelectedTable}
    />
  ))

  return (
    <View >
      {tablesArray}
    </View>
  )
}

export default SchemaView;
