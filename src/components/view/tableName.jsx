import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: white;
`

const Input = styled.input`
  padding: 10px;
<<<<<<< Updated upstream
  width: 74%;
=======
  width: 70%;
>>>>>>> Stashed changes
  font-size: 1.5em;
  border: none;
  margin: 1px;
`;

const Button = styled.button`
  padding: 6px;
  font-size: 0.6em;
  margin: 10px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: white;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.12);
`;

<<<<<<< Updated upstream
function TableName({ setPopUp }) {
=======
const Buttons = styled.span`
  float: right;
  margin-right: 5px;
`

function TableName() {
>>>>>>> Stashed changes
  return (
    <Wrapper>
      <Input type="text" placeholder=" Enter Table Name * "></Input>
<<<<<<< Updated upstream
      <Span><button>Add Fields</button></Span>
      <Span><button>Submit</button></Span>
      <Span><button onClick={() => { setPopUp('') }}>Close</button></Span>
    </div>
=======
      <Buttons>
        <Button>Add Fields</Button>
        <Button>Submit Table</Button>
      </Buttons>
    </Wrapper>
>>>>>>> Stashed changes
  )
}

export default TableName;