import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 10px;
  width: 74%;
  font-size: 1.5em;
  border: none;
  margin: 1px;
`;

const Span = styled.span`
  padding: 10px;
  font-size: 1.5em;
  margin: 1px;
`;

function TableName({ setPopUp }) {
  return (
    <div>
      <Input type="text" placeholder=" Enter Table Name * "></Input>
      <Span><button>Add Fields</button></Span>
      <Span><button>Submit</button></Span>
      <Span><button onClick={() => { setPopUp('') }}>Close</button></Span>
    </div>
  )
}

export default TableName;