import React, { useEffect } from 'react';
import styled from 'styled-components';

const Tr = styled.tr`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
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


function TableInput(props) {
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
    unique
  } = props.field;
  
  function isChecked(id, field) {
    const selectedSwitch = document.querySelector(id);
    if (field) selectedSwitch.click();
  }

  useEffect(() => {
    isChecked("#primaryKey" + fieldNum, primaryKey);
    isChecked("#autoIncrement" + fieldNum, autoIncrement);
    isChecked("#unique" + fieldNum, unique);
    isChecked("#required" + fieldNum, required);
  }, []);

  return (
    <Tr>
      <Td><i className="fas fa-trash-alt" style={{ fontSize: "18px" }}></i></Td>
      <Td>
        <Input type="text" placeholder="Field Name" defaultValue={name}></Input>
      </Td>
      <Td>
        <select className="select-css" defaultValue={type}>
          <option value="ID">ID</option>
          <option value="String">String</option>
          <option value="Boolean">Boolean</option>
          <option value="Int">Int</option>
          <option value="Float">Float</option>
        </select>
      </Td >
      <Td>
        <Input type="text" placeholder="Default Value" defaultValue={defaultValue}></Input>
      </Td>
      <Td>
        <label className="switch">
          <input type="checkbox" />
          <span
            id={"primaryKey" + fieldNum}
            className="slider round"
            onClick={(e) => {
              e.target.value = !e.target.value;
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