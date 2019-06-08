import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 10px;
  width: 93%;
  font-size: 1.5em;
  border: none;
  margin: 1px;
`;

const Span = styled.span`
  padding: 10px;
  font-size: 1.5em;
  margin: 1px;
`;

function TableName() {
  return (
    <div>
      <Input type="text" placeholder=" Enter Table Name * "></Input>
      <Span><button>+</button></Span>
    </div>
  )
}

export default TableName;