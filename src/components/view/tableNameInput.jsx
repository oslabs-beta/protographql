import React from 'react';
import styled from 'styled-components';

/*-------------------- Styled Components --------------------*/

const Wrapper = styled.div`
  background-color: white;
`;

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

/*-------------------- Functional Component --------------------*/

function TableNameInput({ name, editTableName }) {

  const onTableNameChange = (e) => editTableName(e.target.value);

  return (
    <Wrapper>
      <Input
        required
        type="text"
        placeholder="Enter Table Name * "
        defaultValue={name}
        onChange={onTableNameChange}
      />
    </Wrapper>
  )
}

export default TableNameInput;
