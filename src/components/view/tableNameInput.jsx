import React, { useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: white;
`

const Input = styled.input`
  padding: 5px 10px;
  width: calc(100% - 22px);
  color: #dd399c;
  font-weight: 400;
  font-size: 1em;
  border: none;
  margin: 1px;
  margin-top: 4px;
  letter-spacing: 0.1em;
  ::placeholder {
    color: #dd399c;
    opacity: 0.75;
  }
`;

function TableNameInput({ name, selectedTable, setSelectedTable }) {

  const onTableNameChange = (e) => {
    setSelectedTable({ ...selectedTable, type: e.target.value });
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