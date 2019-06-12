import React, { useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: white;
`

const Input = styled.input`
  padding: 5px;
  width: calc(100% - 12px);
  font-size: 1em;
  border: none;
  margin: 1px;
  margin-top: 4px;
`;

function TableNameInput({ name, selectedTable, setSelectedTable }) {

  const onTableNameChange = (e) => {
    setSelectedTable({...selectedTable, type: e.target.value});
  }
  
  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="Enter Table Name * "
        defaultValue={name}
        onChange={onTableNameChange}
      />
    </Wrapper>
  )
}

export default TableNameInput;