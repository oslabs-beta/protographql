import React from 'react';
import SchemaView from '../../components/view/schemaView';
import CodeView from '../../components/view/codeView';
import TableForm from '../view/tableForm';

function MainView({
  view,
  tables,
  setTables,
  setPopUp,
  setView,
  popUp,
  setSelectedTable,
  selectedTable,
  tableIndexState,
  setTableIndexState,
  initialFieldState
}) {

  return (
    <div style={{ gridArea: "main" }}>
      {view === 'code' && <CodeView tables={tables} />}
      {view === 'schema' && <SchemaView
        tables={tables}
        setTables={setTables}
        setPopUp={setPopUp}
        setView={setView}
        view={view}
        setSelectedTable={setSelectedTable}
      />}
      {/* {view === 'table' && <TableForm />}  */}
      {popUp === 'table' && <TableForm
        setPopUp={setPopUp}
        setTables={setTables}
        setSelectedTable={setSelectedTable}
        selectedTable={selectedTable}
        tableIndexState={tableIndexState}
        setTableIndexState={setTableIndexState}
        tables={tables}
        initialFieldState={initialFieldState}
      />}
    </div>
  )
}

export default MainView;
