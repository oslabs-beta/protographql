import React, { useContext } from 'react';
import { Store } from '../../state/store';
import {
  SET_POP_UP,
  SAVE_TABLE,
  ADD_FIELD,
  DELETE_FIELD,
  EDIT_FIELD,
  EDIT_RELATIONS,
  EDIT_TABLE_NAME
} from '../../actions/actionTypes';
import styled from 'styled-components';
import TableNameInput from './tableNameInput';
import TableField from './tableField';
import TableInput from './tableInput';
import Draggable from 'react-draggable';

/*-------------------- Styled Components --------------------*/

/*
styles the table associated with the 'Add Table' button... specifically the options and buttons
associated with the options
*/
const CustomTable = styled.form`
  height: auto;
  margin: 0 auto;
  min-width: 550px;
  max-width: 1000px;
  position: relative;
  background-color: white;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.12);
  position: fixed;
  top: 50%;
  left: 18%;
`;

/*
styles the table associated with the 'Add Table' button... specifically the area around the buttons
'Add Field' and 'Save'
*/
const TableFooter = styled.div`
  border-top: 1px solid rgba(0,0,0,0.2);
  height: auto;
  margin: 0 auto;
  min-width: 700px;
  max-width: 1000px;
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

/*
styles the table associated with the 'Add Table' button... specifically the options and buttons
associated with the options
*/
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

/*
specifies the space around the 'X' icon located at the top-right of the dialog-box associated with
the 'Add Table' button... this space is a block-level element
*/
const TableHeader = styled.div`
  height: 15px;
  padding-top: 4px;
  padding-bottom: 4px;
  width: 100%;
  background: rgba(50,67,83,1);
  cursor: move;
`;

// styles the background-page after the 'Add Table' button is clicked
const FadeThePage = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9998;
  background: rgba(90, 90, 90, 0.5);
`;
// styles the 'Add Field' and 'Save' buttons of the dialog-box associated with the 'Add Table' button
const Button = styled.button`
  height: auto;
  font-size: .85em;
  font-weight: 300;
  margin: 8px;
  margin-right: 10px;
  margin-left: 10px;
  padding: 10px 0px;
  border-radius: 5px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.10);
  background-color: rgba(50, 67, 83, 0.85);
  color: white;
  width: 30%;
  text-align: center;
  &:hover {
    background-color: #DD399C;
    cursor: pointer;
  }
`;
// styles the 'X' icon on the top-right of the dialog-box associated with the 'Add Table' button
const CloseButton = styled.span`
  font-size: 1em;
  margin: 5px;
  padding: 5px;
  color: white;
  &:hover {
    cursor: pointer;
    color: #DD399C;
  }
`;

// styles the 'X' icon on the top-right of the dialog-box associated with the 'Add Table' button
const Buttons = styled.span`
  float: right;
  margin-right: 5px;
`;

/*-------------------- Functional Component --------------------*/

function TableForm() {

  const { dispatch, state: { selectedTable, tables } } = useContext(Store);

  /*-------------------- Table Input Function --------------------*/
  const fieldInputs = [];
  const createTableInputs = () => {
    const fields = Object.keys(selectedTable.fields);
    for (let i = 0; i < fields.length; i++) {
      const currentFieldKey = fields[i];
      fieldInputs.push(
        <TableInput
          field={selectedTable.fields[currentFieldKey]}
          editField={payload => dispatch({ type: EDIT_FIELD, payload })}
          editRelations={payload => dispatch({ type: EDIT_RELATIONS, payload })}
          deleteField={payload => dispatch({ type: DELETE_FIELD, payload })}
          fieldIndex={currentFieldKey}
          key={selectedTable.tableID + "-" + "field" + "-" + currentFieldKey}
          tables={tables}
        />);
    }
  }
  createTableInputs();

  /*------------- Enter / Esc Key to Close Pop Up  ---------------*/
  const keyUpToHandleClose = (e) => {
    if (e.keyCode == 27) {
      dispatch({ type: SET_POP_UP, payload: '' });
    }
  }

  return (
    <FadeThePage onKeyUp={keyUpToHandleClose}>
      <Draggable handle="#header">
        <CustomTable onSubmit={e => {
          e.preventDefault();
          dispatch({ type: SAVE_TABLE });
          dispatch({ type: SET_POP_UP, payload: '' });
        }}>
          <TableHeader id="header" >
            <Buttons>
              <CloseButton onClick={() => dispatch({ type: SET_POP_UP, payload: '' })}>
                <i className="fas fa-times"></i>
              </CloseButton>
            </Buttons>
          </TableHeader>
          <TableNameInput
            name={selectedTable.type}
            editTableName={payload => dispatch({ type: EDIT_TABLE_NAME, payload })}
          />
          <Table id='table' >
            <tbody>
              <TableField key={'tableID-' + selectedTable.tableID} />
              {fieldInputs}
            </tbody>
          </Table>
          <TableFooter>
            <Button type="submit" value="default action">
              <i className="far fa-save" color="black" /> Save
            </Button>
            <Button onClick={e => {
              e.preventDefault();
              dispatch({ type: ADD_FIELD });
            }}>
              <i className="fas fa-plus" /> Add Field
            </Button>
          </TableFooter>
        </CustomTable>
      </Draggable >
    </FadeThePage >
  )
}


export default TableForm;
