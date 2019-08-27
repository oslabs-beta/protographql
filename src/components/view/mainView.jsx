import React, { useContext } from 'react';
import SchemaView from '../../components/view/schemaView';
import CodeView from '../../components/view/codeView';
import VisualizeView from '../../components/view/visualizeView';
import GraphiqlView from './graphiqlView';
import TableForm from '../popup/tableForm';
import { Store } from '../../state/store';
import TestsView from './testsView';

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
      {/* comment out unused component */}
      {/* {view === 'graphiql' && <GraphiqlView />} */}
      {view === 'tests' && <TestsView />}
      {popUp === 'table' && <TableForm />}
    </div>
  )
}

export default MainView;
