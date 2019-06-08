import React from 'react';
import styled from 'styled-components';

const Tr = styled.tr`
  border-bottom: 1px solid gray;
`;

const Td = styled.td`
  font-size: 1em;
  text-align: center;
  border: 1px solid black;
  margin: 0;
  padding: 0;
`;

const Input = styled.input`
  height: 100%;
  border-radius: 5px;
  margin: 0;
  width: 60%;
  height: 40px;
  margin: 5px;
  font-size: 1.25em;
`;

function TableRow() {
  return (
    <Tr>
      <Td><Input type="text" placeholder="Field Name"></Input></Td>
      <Td class="custom-select">
        <select>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </Td>
      <Td>Default Value</Td>
      <Td>
        <label class="switch">
          <input type="checkbox"></input>
          <span class="slider round"></span>
        </label>
      </Td>
      <Td>
        <label class="switch">
          <input type="checkbox"></input>
          <span class="slider round"></span>
        </label>
      </Td>
      <Td>
        <label class="switch">
          <input type="checkbox"></input>
          <span class="slider round"></span>
        </label>
      </Td>
      <Td>
        <label class="switch">
          <input type="checkbox"></input>
          <span class="slider round"></span>
        </label>
      </Td>
      <Td>Foreign Key</Td>
      <Td>Delete</Td>
    </Tr>
  )
}

export default TableRow;