import React from 'react';
import SchemaView from '../../components/view/schemaView';
import CodeContainer from '../../components/view/codeView';
import { Container } from '@material-ui/core';

function MainView ( { view, tables, setTables, setPopUp }) {
  return (
    <div style={{ gridArea: "main" }}>
      <Container width='100%'>
        {view === 'code' && <CodeContainer/>}
        {view === 'schema' && <SchemaView 
          tables={tables} 
          setTables={setTables} 
          setPopUp={setPopUp} 
          view={view} 
        />}
      </Container>
    </div>
  )
}

export default MainView;