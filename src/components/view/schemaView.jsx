import React, { Fragment } from 'react';
import SchemaTable from './schemaTable'
import styled from 'styled-components';

const View = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

function SchemaView({ tables, setTables, setPopUp, view, setView }) {
  const deleteTable = id => {
    const newTables = { ...tables };
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
    />
  ))

  return (
    <View >
      {tablesArray}
    </View>
  )
}

export default SchemaView;
