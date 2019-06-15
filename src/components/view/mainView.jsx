import React, { useContext } from 'react';
import SchemaView from '../../components/view/schemaView';
import CodeView from '../../components/view/codeView';
import TableForm from '../view/tableForm';
import { Store } from '../../state/store';

function MainView() {

  const { state: { view, popUp } } = useContext(Store);
  return (
    <div style={{ gridArea: "main" }}>
      {view === 'code' && <CodeView />}
      {view === 'schema' && <SchemaView
        tables={tables}
        setTables={setTables}
        setPopUp={setPopUp}
        setView={setView}
        view={view}
        setSelectedTable={setSelectedTable}
      />}
      {popUp === 'table' && <TableForm
        setPopUp={setPopUp}
        setTables={setTables}
        setSelectedTable={setSelectedTable}
        selectedTable={selectedTable}
        tableIndexState={tableIndexState}
        setTableIndexState={setTableIndexState}
        tables={tables}
        initialField={initialField}
      />}
    </div>
  )
}

export default MainView;
