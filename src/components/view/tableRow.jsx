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
  height: 2em;
  border-radius: 5px;
  margin: 0;
  width: 90%;
  height: 40px;
  margin: 5px;
  font-size: 1.25em;
`;

const Select = styled.select`
  font-size: 1.25em!important;
  margin-left: 8px!important;
  margin-right: 8px!important;
  padding: 8px!important;
`

function TableRow() {
  return (
    <Tr>
      <Td>
        <Input type="text" placeholder="Field Name"></Input>
      </Td>
      <Td>
        <Select>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </Select>
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
      <Td>Delete</Td>
    </Tr >
  )
}

export default TableRow;