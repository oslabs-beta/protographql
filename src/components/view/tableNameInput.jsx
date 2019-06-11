import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: white;
`

const Input = styled.input`
  padding: 5px;
  width: 70%;
  font-size: 1em;
  border: none;
  margin: 1px;
  margin-top: 4px;
`;

function TableNameInput({ name }) {
  return (
    <Wrapper>
      <Input type="text" placeholder=" Enter Table Name * " defaultValue={name} ></Input>
    </Wrapper>
  )
}

export default TableNameInput;