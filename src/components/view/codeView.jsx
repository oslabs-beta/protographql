import React, { useContext } from 'react';
import { Store } from '../../state/store';
import styled from 'styled-components';
import buildGQLSchema from '../../utils/buildGQLSchema';
import buildGQLResolvers from '../../utils/buildGQLResolvers';
import buildSQLScripts from '../../utils/buildSQLScripts';

/*-------------------- Styled Components --------------------*/

const Code = styled.div`
  margin: 13px;
  font-family: Courier New, Consolas, Monaco, Lucida Console;
  font-size: 15px;
  background-color: #EFF0F1;
  display: grid;
  height: calc(100vh - 26px - 64px);
`;

const Column = styled.div`
  background-color: white;
  margin: 10px;
  padding: 10px;
  height: auto;
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

/*-------------------- Functional Component --------------------*/

function CodeView() {

  const { state: { tables } } = useContext(Store);

  return (
    <Code>
      <Column style={{ gridColumn: "1 / 2", gridRow: "1 / 3" }}>
        <Title>GraphQL Schema</Title>
        <pre>
          {buildGQLSchema(tables)}
        </pre>
      </Column>
      <Column style={{ gridColumn: "2 / 3", gridRow: "1 / 2" }}>
        <Title>SQL Scripts</Title>
        <pre>
          {buildSQLScripts(tables)}
        </pre>
      </Column>
      <Column style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}>
        <Title>GraphQL Resolvers</Title>
        <pre>
          {buildGQLResolvers(tables)}
        </pre>
      </Column>
    </Code>
  );
}

export default CodeView;
