import React, { useContext } from 'react';
import { Store } from '../../state/store';
import styled from 'styled-components';

/*-------------------- Styled Components --------------------*/

/*
styles the surrounding space that exists around the code display areas of 'GraphQL Schema', 'SQL Scripts',
and 'GraphQL Resolvers' that appears after clicking the 'Code' button
*/
const Code = styled.div`
  margin: 13px;
  font-family: Courier New, Consolas, Monaco, Lucida Console;
  font-size: 15px;
  background-color: #EFF0F1;
  display: grid;
  height: calc(100vh - 26px - 64px);
`;

/*
styles the background of 'GraphQL Schema', 'SQL Scripts', and 'GraphQL Resolvers' that appears after
clicking the 'Code' button
*/
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

/*
styles the titles associated with 'GraphQL Schema', 'SQL Scripts', and 'GraphQL Resolvers' that appears
after clicking the 'Code' button
*/
const Title = styled.p`
  font-size: 20px;
  color: rgba(221, 57, 156, 1);
  font-family: "Roboto", sans-serif;
  padding-bottom: 15px;
`;

/*-------------------- Functional Component --------------------*/

function CodeView() {
  /*
    -> connects the application to the context (utilized by Hooks in React) and facilitates the ability to
      update the context of the application
    -> the context is initialized by useContext() and specified by Store which is found
      in /components/state/store.jsx
  */
  const { state: { gqlSchema, gqlResolvers, sqlScripts } } = useContext(Store);

  return (
    <Code>
      <Column style={{ gridColumn: "1 / 2", gridRow: "1 / 3" }}>
        <Title>GraphQL Schema</Title>
        <pre>{gqlSchema}</pre>
      </Column>
      <Column style={{ gridColumn: "2 / 3", gridRow: "1 / 2" }}>
        <Title>SQL Scripts</Title>
        <pre>{sqlScripts}</pre>
      </Column>
      <Column style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}>
        <Title>GraphQL Resolvers</Title>
        <pre>{gqlResolvers}</pre>
      </Column>
    </Code>
  );
}

export default CodeView;
