import React, { useContext } from 'react';
import SchemaView from '../../components/view/schemaView';
import CodeView from '../../components/view/codeView';
import VisualizeView from '../../components/view/visualizeView';
import TableForm from '../popup/tableForm';
import { Store } from '../../state/store';

function MainView() {
  /*
    -> connects the application to the context (utilized by Hooks in React) and facilitates the ability to
      update the context of the application
    -> the context is initialized by useContext() and specified by Store which is found
      in /components/state/store.jsx
  */
  const { state: { view, popUp } } = useContext(Store);
  return (
    <div style={{ gridArea: "main", overflowX: "auto", }}>
      {view === 'code' && <CodeView />}
      {view === 'schema' && <SchemaView />}
      {view === 'visualize' && <VisualizeView />}
      {popUp === 'table' && <TableForm />}
    </div>
  )
}

export default MainView;
