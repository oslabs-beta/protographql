import React, { Fragment } from 'react';
import SchemaTable from './schemaTable'
import { Container, CssBaseline } from '@material-ui/core';


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
    <Fragment>
      <CssBaseline />
      <Container style={{ width: '100%' }}>
        {tablesArray}
      </Container>
    </Fragment>
  )
}

export default SchemaView;