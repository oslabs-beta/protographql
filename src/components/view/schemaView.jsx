import React, { useContext } from 'react';
import SchemaTable from './schemaTable';
import styled from 'styled-components';
import { Store } from '../../state/store';
import {
  SET_POP_UP,
  SET_VIEW,
  EDIT_TABLE,
  DELETE_TABLE,
  HIDE_DISPLAY_ERROR,
  THROTTLE_DISPLAY_ERROR,
} from '../../actions/actionTypes';

/*-------------------- Styled Component --------------------*/

const View = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

/*-------------------- Functional Component --------------------*/

function SchemaView() {

  const { dispatch, state: { tables, displayError } } = useContext(Store);

  const tablesArray = Object.keys(tables).map(tableKey => (
    <SchemaTable
      tables={tables}
      key={tableKey}
      tableKey={tableKey}
      table={tables[tableKey]}
      setPopUp={payload => dispatch({ type: SET_POP_UP, payload })}
      setView={payload => dispatch({ type: SET_VIEW, payload })}
      style={{ margin: "10px" }}
      deleteTable={payload => dispatch({ type: DELETE_TABLE, payload })}
      editTable={payload => dispatch({ type: EDIT_TABLE, payload })}
    />
  ))

  // Dispatch hide error only once per lifecycle of displayError.displayStatus = true
  if (displayError.displayStatus && displayError.throttleStatus) {
    dispatch({ type: THROTTLE_DISPLAY_ERROR });
    setTimeout(() => {
      dispatch({ type: HIDE_DISPLAY_ERROR });
      dispatch({ type: THROTTLE_DISPLAY_ERROR });
    }, 3250);
  }

  return (
    <View >
      {tablesArray}
      {displayError.displayStatus &&
        <div className="show" id="snackbar">
          Please remove relationship from <br />
          '{displayError.relatedField}' field in '{displayError.relatedTable}' table first.
        </div>}
    </View >
  )
}

export default SchemaView;
