import React, { Fragment } from 'react';
import SchemaTable from './schemaTable'
import styled from 'styled-components';

const View = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

function SchemaView({ tables, setTables, setPopUp, view, setView }) {
  const tablesArray = Object.keys(tables).map(tableKey => (
    <SchemaTable
      key={tableKey}
      tableKey={tableKey}
      table={tables[tableKey]}
      setTables={setTables}
      setPopUp={setPopUp}
      setView={setView}
      style={{ margin: "10px" }}
    />
  ))

  return (
    <View >
      {tablesArray}
    </View>
  )
}

export default SchemaView;