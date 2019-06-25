import React, { useEffect } from 'react';
import styled from 'styled-components';
import deepClone from '../../utils/deepClone';
import debounce from '../../utils/debounce';

/*-------------------- Styled Components --------------------*/

const Tr = styled.tr`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  vertical-align: middle;
`;

const Selected = styled.select`
  display: inline-flex;
	padding: .6em 1.4em .5em .8em;
	width: 90%;
	max-width: 100%; 
	box-sizing: border-box;
	margin: 0;
	border: 1px solid #aaa;
	box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
	border-radius: .5em;
	appearance: none;
	background-color: #fff;
	background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
	linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
	background-repeat: no-repeat, repeat;
	background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
  &:disabled {
    opacity: .70;
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }
`;

const Td = styled.td`
  font-size: .75em;
  text-align: center;
  margin: 0;
  padding-top: 5px;
  padding-bottom: 5px;
  &:hover{
    color: #DD399C;
  }
`;

const Input = styled.input`
  height: 2.5em;
  border-radius: 5px;
  margin: 0;
  width: 90%;
  margin: 5px;
  font-size: .75em;
`;

const TrashCan = styled.span`
  font-size: 18px;
  &:hover {
    color: #DD399C;
    cursor: pointer;
  }
`;

/*-------------------- Debounce --------------------*/

// debounceDeleteField is defined globally to prevent 
// reinitalization of the debounce boolean during rerender
let debounceDeleteField;

/*-------------------- Functional Component --------------------*/

function TableInput({
  field,
  fieldIndex,
  editField,
  editRelations,
  deleteField,
  tables
}) {

  const {
    defaultValue,
    fieldNum,
    name,
    primaryKey,
    queryable,
    refBy,
    relation,
    relationSelected,
    required,
    tableNum,
    type,
    unique,
  } = field;

  const { refType } = relation;
  let relationTableIdx = relation.tableIndex;
  let relationFieldIdx = relation.fieldIndex;

  function isChecked(id, field) {
    const selectedSwitch = document.querySelector(id);
    if (field) selectedSwitch.click();
  }

  useEffect(() => {
    debounceDeleteField = debounce(deleteField);
    isChecked("#primaryKey" + fieldNum, primaryKey);
    isChecked("#unique" + fieldNum, unique);
    isChecked("#required" + fieldNum, required);
    isChecked("#queryable" + fieldNum, queryable);
  }, []);

  const relationalTableNames = [];
  const populateTableRelationOptions = () => {
    for (let key in tables) {
      relationalTableNames.push(<option value={key} key={key}>{tables[key].type}</option>);
    }
  }
  populateTableRelationOptions();

  const relationalFieldsNames = [];
  const populateFieldRelationOptions = (relTblIdx) => {
    if (relTblIdx !== -1) {
      for (let field in tables[relTblIdx].fields) {
        relationalFieldsNames.push(<option value={field} key={field + tables[relTblIdx].fields[field].name}>{tables[relTblIdx].fields[field].name}</option>);
      }
    }
  }
  populateFieldRelationOptions(relationTableIdx);

  return (
    <Tr>
      <Td>
        <TrashCan onClick={() => debounceDeleteField(fieldIndex)}>
          <i className="fas fa-trash" />
        </TrashCan>
      </Td>

      <Td>
        <Input
          required
          type="text"
          placeholder="Field Name"
          defaultValue={name}
          onChange={e => editField({ value: e.target.value, fieldKey: fieldIndex, fieldProperty: "name" })}
        />
      </Td>

      <Td>
        <Selected
          defaultValue={type}
          onChange={e => editField({ value: e.target.value, fieldKey: fieldIndex, fieldProperty: "type" })}
        >
          <option value="ID">ID</option>
          <option value="String">String</option>
          <option value="Boolean">Boolean</option>
          <option value="Int">Int</option>
          <option value="Float">Float</option>
        </Selected>
      </Td>

      <Td>
        <Input
          type="text"
          placeholder="Default Value"
          defaultValue={defaultValue}
          onChange={e => editField({ value: e.target.value, fieldKey: fieldIndex, fieldProperty: "defaultValue" })}
        />
      </Td>

      <Td>
        <label className="switch">
          <input type="checkbox" />
          <span
            id={"primaryKey" + fieldNum}
            className="slider round"
            onClick={(e) => {
              e.target.value = !e.target.value;
              editField({ value: e.target.value, fieldKey: fieldIndex, fieldProperty: "primaryKey" });
            }}
            value={false}
          />
        </label>
      </Td>

      <Td>
        <label className="switch">
          <input type="checkbox" />
          <span
            id={"unique" + fieldNum}
            className="slider round"
            onClick={(e) => {
              e.target.value = !e.target.value;
              editField({ value: e.target.value, fieldKey: fieldIndex, fieldProperty: "unique" });
            }}
            value={false}
          />
        </label>
      </Td>

      <Td>
        <label className="switch">
          <input type="checkbox" />
          <span
            id={"required" + fieldNum}
            className="slider round"
            onClick={(e) => {
              e.target.value = !e.target.value;
              editField({ value: e.target.value, fieldKey: fieldIndex, fieldProperty: "required" });
            }}
            value={false}
          />
        </label>
      </Td>

      <Td>
        <label className="switch">
          <input type="checkbox" />
          <span
            id={"queryable" + fieldNum}
            className="slider round"
            onClick={(e) => {
              e.target.value = !e.target.value;
              editField({ value: e.target.value, fieldKey: fieldIndex, fieldProperty: "queryable" });
            }}
            value={false}
          />
        </label>
      </Td>

      {/* relationship to table */}
      <Td>
        <Selected
          defaultValue={relationTableIdx != -1 ? relationTableIdx : ""}
          onChange={
            e => {
              if (e.target.value === "") {
                // relationTableIdx = -1;
                // relationFieldIdx = -1;
                editRelations({
                  relationValue: -1,
                  relationFieldKey: fieldIndex,
                  relationFieldProperty: "tableIndex"
                })
              }
              else
                editRelations({
                  relationValue: e.target.value,
                  relationFieldKey: fieldIndex,
                  relationFieldProperty: "tableIndex"
                })
            }}
        >
          <option value=""></option>
          {relationalTableNames}
        </Selected>
      </Td>

      {/* relationship to table fields */}
      <Td>
        <Selected
          required={relationTableIdx !== -1}
          disabled={relationTableIdx === -1}
          defaultValue={relationFieldIdx != -1 ? relationFieldIdx : ""}
          onChange={
            e => {
              editRelations({
                relationValue: e.target.value,
                relationFieldKey: fieldIndex,
                relationFieldProperty: "fieldIndex"
              })
            }
          }
        >
          <option value=""></option>
          {relationalFieldsNames}
        </Selected>
      </Td>

      <Td>
        <Selected
          required={relationTableIdx !== -1}
          disabled={relationTableIdx === -1}
          defaultValue={refType}
          onChange={
            e => editRelations({
              relationValue: e.target.value,
              relationFieldKey: fieldIndex,
              relationFieldProperty: "refType"
            })
          }
        >
          {relationTableIdx !== -1 && <option value=""></option>}
          {relationTableIdx !== -1 && <option value="one to one">one to one</option>}
          {relationTableIdx !== -1 && <option value="many to one">many to one</option>}
          {relationTableIdx !== -1 && <option value="many to many">many to many</option>}

        </Selected>
      </Td>
    </Tr >
  )
}

export default TableInput;