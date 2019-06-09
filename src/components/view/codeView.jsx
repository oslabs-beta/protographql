import React, { Fragment } from 'react';
import styled from 'styled-components';
import buildGQLSchema from '../../utils/buildGQLSchema';

const Code = styled.div`
  margin: 20px;
  font-family: Courier New, Consolas, Monaco, Lucida Console;
  font-size: 15px;
  background-color: #EFF0F1;
`;

function CodeView({ tables }) {
  return (
    <Code>
      <pre>
        {buildGQLSchema(tables)}
      </pre>
    </Code>
  );
}

export default CodeView;