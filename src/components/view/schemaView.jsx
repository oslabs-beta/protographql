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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Fragment >
        <CssBaseline />
        <Container style={{ width: `calc(100% - 200px)` }}>
          {tablesArray}
        </Container>
      </Fragment>
    </div>
  )
}

export default SchemaView;