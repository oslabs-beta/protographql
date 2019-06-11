import React from 'react';
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
  } = props.field
  return (
    <Tr>
      <Td><i className="fas fa-trash-alt" style={{ fontSize: "18px" }}></i></Td>
      <Td>
        <Input type="text" placeholder="Field Name" defaultValue={name}></Input>
      </Td>
      <Td>
        <select className="select-css">
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
        <label className="switch"
        // will be fixed later
        // style={{ height: "25px", width: "45px" }}
        >
          <input type="checkbox"></input>
          <span className="slider round" style={{
            // height: "23px",
            // width: "23px",
            // left: "1px",
            // bottom: "1px",
          }}></span>
        </label>
      </Td>
      <Td>
        <label className="switch">
          <input type="checkbox"></input>
          <span className="slider round"></span>
        </label>
      </Td>
      <Td>
        <label className="switch">
          <input type="checkbox"></input>
          <span className="slider round"></span>
        </label>
      </Td>
      <Td>
        <label className="switch">
          <input type="checkbox"></input>
          <span className="slider round"></span>
        </label>
      </Td>
      <Td>Foreign Key</Td>
    </Tr >
  )
}

export default TableInput;