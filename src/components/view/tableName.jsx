import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 10px;
  width: 97%;
  font-size: 1.5em;
  border: none;
  margin: 1px;

  &:focus-within label{
    color: none;
`;



function TableName() {
  return (
    <div>
      <Input type="text" placeholder=" Enter Table Name * "></Input>
    </div>
  )
}

export default TableName;