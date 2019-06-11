import React, { Fragment } from 'react';
import styled from 'styled-components';
import buildGQLSchema from '../../utils/buildGQLSchema';
import buildGQLResolvers from '../../utils/buildGQLResolvers';

const Code = styled.div`
  margin: 20px;
  font-family: Courier New, Consolas, Monaco, Lucida Console;
  font-size: 15px;
  background-color: #EFF0F1;
  display: flex;
`;

// Height is currently hard-coded. May need to look into dynamic solution
const Column = styled.div`
  height: calc(100vh - 40px - 64px - 42px);
  background-color: white;
  width: 50%;
  margin: 10px;
  padding: 10px;
  overflow: scroll;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.12);
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
  };
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.12);
  }
`;

const Title = styled.p`
  font-size: 20px;
  color: rgba(221, 57, 156, 1);
  font-family: "Roboto", sans-serif;
  padding-bottom: 15px;
`;

function CodeView({ tables }) {
  return (
    <Code>
      <Column>
        <Title>SQL Scripts</Title>
        <pre>
          {/* {buildSQLScripts(tables)} */}
        </pre>
      </Column>
      <Column>
        <Title>GraphQL Schema</Title>
        <pre>
          {buildGQLSchema(tables)}
        </pre>
      </Column>
      <Column>
        <Title>GraphQL Resolvers</Title>
        <pre>
          {buildGQLResolvers(tables)}
        </pre>
      </Column>
    </Code>
  );
}

export default CodeView;