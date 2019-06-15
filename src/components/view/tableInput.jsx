import React, { useEffect } from 'react';
import styled from 'styled-components';
import deepClone from '../../utils/deepClone';


/*-------------------- Styled Components --------------------*/

const Tr = styled.tr`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  vertical-align: middle;
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

/*-------------------- Functional Component --------------------*/

function TableInput({ 
  field, 
  selectedTable, 
  fieldIndex, 
  setSelectedTable,
  editField
}) {

  const {
    autoIncrement,
    defaultValue,
    fieldNum,
    multipleValues,
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

  function isChecked(id, field) {
    const selectedSwitch = document.querySelector(id);
    if (field) selectedSwitch.click();
  }

  useEffect(() => {
    isChecked("#primaryKey" + fieldNum, primaryKey);
    isChecked("#autoIncrement" + fieldNum, autoIncrement);
    isChecked("#unique" + fieldNum, unique);
    isChecked("#required" + fieldNum, required);
    isChecked("#queryable" + fieldNum, queryable);
  }, []);

  return (
    <Tr>
      <Td><i className="fas fa-trash" style={{ fontSize: "18px" }} /></Td>
      <Td>
        <Input
          type="text"
          placeholder="Field Name"
          defaultValue={name}
          onChange={e => editField({ value: e.target.value, fieldKey: fieldIndex, fieldProperty: "name" })}
        />
      </Td>
      <Td>
        <select
          className="select-css"
          defaultValue={type}
          onChange={e => editField({ value: e.target.value, fieldKey: fieldIndex, fieldProperty: "type" })}
        >
          <option value="ID">ID</option>
          <option value="String">String</option>
          <option value="Boolean">Boolean</option>
          <option value="Int">Int</option>
          <option value="Float">Float</option>
        </select>
      </Td >
      <Td>
        <Input
          type="text"
          placeholder="Default Value"
          defaultValue={defaultValue}
          onChange={e =>  editField({ value: e.target.value, fieldKey: fieldIndex, fieldProperty: "defaultValue" })}
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
            id={"autoIncrement" + fieldNum}
            className="slider round"
            onClick={(e) => {
              e.target.value = !e.target.value;
              editField({ value: e.target.value, fieldKey: fieldIndex, fieldProperty: "autoIncrement" });
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
      <Td>Foreign Key</Td>
    </Tr >
  )
}

export default TableInput;