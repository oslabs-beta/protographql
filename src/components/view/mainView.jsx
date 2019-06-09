import React from 'react';
import SchemaView from '../../components/view/schemaView';
import CodeView from '../../components/view/codeView';
import { Container } from '@material-ui/core';
import TableForm from '../view/tableForm';

function MainView({ view, tables, setTables, setPopUp, setView, popUp }) {
  // console.log('setView: ', setView);
  // console.log('setPopUp: ', setPopUp);
  // console.log('setTables: ', setTables);
  // console.log('tables: ', tables);
  return (
    <div style={{ gridArea: "main" }}>
      {view === 'code' && <CodeView tables={tables} />}
      {view === 'schema' && <SchemaView
        tables={tables}
        setTables={setTables}
        setPopUp={setPopUp}
        setView={setView}
        view={view}
      />}
      {view === 'table' && <TableForm />}
      {popUp === 'table' && <TableForm setPopUp={setPopUp} />}
    </div>
  )
}

export default MainView;