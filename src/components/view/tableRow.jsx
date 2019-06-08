import React from 'react';
import styled from 'styled-components';

const Tr = styled.tr`
  border-bottom: 1px solid gray;
`;

const Td = styled.td`
  font-size: .75em;
  text-align: center;
  // border: 1px solid black;
  margin: 0;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const Input = styled.input`
  height: 1.50em;
  border-radius: 5px;
  margin: 0;
  width: 90%;
  margin: 5px;
  font-size: .75em;
`;


function TableRow() {
  return (
    <Tr>
      <Td>Delete</Td>
      <Td>
        <Input type="text" placeholder="Field Name"></Input>
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
        <Input type="text" placeholder="Default Value"></Input>
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

export default TableRow;