import React, { useContext } from 'react';
import SchemaView from '../../components/view/schemaView';
import CodeView from '../../components/view/codeView';
import TableForm from '../view/tableForm';
import { Store } from '../../state/store';

function MainView() {

  const { state: { view, popUp } } = useContext(Store);
  return (
    <div style={{ gridArea: "main", overflowX: "auto", }}>
      {view === 'code' && <CodeView />}
      {view === 'schema' && <SchemaView />}
      {popUp === 'table' && <TableForm />}
    </div>
  )
}

export default MainView;
