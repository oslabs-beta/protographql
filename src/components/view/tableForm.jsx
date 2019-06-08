import React from 'react';
import styled from 'styled-components';
import TableRow from './tableRow'

const Div = styled.div`
  height: 500px;
  width: 1250px;
  border: 1px solid black;
  border-radius: 3px;
  margin-top: 100px;
`;

function Table(props) {
  return (
    <Div>
      <TableRow />
    </Div>
  )
}

export default Table;