import React, { useContext } from 'react';
import SchemaTable from './schemaTable';
import styled from 'styled-components';
import { Store } from '../../state/store';
import { 
  SET_TABLES, 
  SET_POP_UP, 
  SET_VIEW, 
  SET_SELECTED_TABLE 
} from '../../actions/actionTypes';
import deepClone from  '../../utils/deepClone';

/*-------------------- Styled Component --------------------*/

const View = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

/*-------------------- Functional Component --------------------*/

function SchemaView() {

  const { dispatch, state: { tables } } = useContext(Store);

  const deleteTable = id => {
    const newTables = deepClone(tables);
    delete newTables[id];
    dispatch({ type: SET_TABLES, payload: newTables });
  }

  const tablesArray = Object.keys(tables).map(tableKey => (
    <SchemaTable
      tables={tables}
      key={tableKey}
      tableKey={tableKey}
      table={tables[tableKey]}
      setTables={payload => dispatch({ type: SET_TABLES, payload })}
      setPopUp={payload => dispatch({ type: SET_POP_UP, payload })}
      setView={payload => dispatch({ type: SET_VIEW, payload })}
      style={{ margin: "10px" }}
      deleteTable={deleteTable}
      setSelectedTable={payload => dispatch({ type: SET_SELECTED_TABLE, payload })}
    />
  ))

  return (
    <View >
      {tablesArray}
    </View>
  )
}

export default SchemaView;
