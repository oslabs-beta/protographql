import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../../state/store';
import { UPDATE_QUERIES, ADD_APOLLO_SERVER_URI } from '../../actions/actionTypes';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { HttpLink, gql } from 'apollo-boost'

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

/*-------------------- Styled Components --------------------*/
/* The following styles mimic the styles in codeView */


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

/* The following styled component mimics button styles from tableForm */
const Button = styled.button`
  height: auto;
  font-size: .85em;
  font-weight: 300;
  margin: 8px;
  margin-right: 10px;
  margin-left: 10px;
  padding: 10px 0px;
  border-radius: 5px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.10);
  background-color: rgba(50, 67, 83, 0.85);
  color: white;
  width: 48%;
  text-align: center;
  &:hover {
    background-color: #DD399C;
    cursor: pointer;
  }
  @media only screen and (max-width: 1354px) {
    width: 100%;
  }
`;

/* The following styled component mimicks the input from from tableInput */
const Input = styled.input`
  height: 2.5em;
  border-radius: 5px;
  margin: 0;
  width: 75%;
  margin: 5px;
  font-size: .75em;
`;

/* This component was created for this view specifically */
const Textbox = styled.textarea`
  height: 42em;
  border-radius: 5px;
  margin: 0;
  width: 48%;
  margin: 5px;
  font-size: .75em;
`;



/*-------------------- Functional Component --------------------*/

function TestsView() {
  const { dispatch, state: { queries, apolloServerURI } } = useContext(Store);

  //variable to store response if client query returns an error
  let r;
  
  //creates ApolloClient link to apolloServerURI from user, or localhost:3000/GraphQL if none is provided
  const client = new ApolloClient({
    link: ApolloLink.from([
      //if errors are returned from client, log to the console and 
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
            );
            //save graphQLErrors to response to be rendered in catch of addQuery()
            r = JSON.stringify(graphQLErrors);
          }
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      new HttpLink({
        uri: apolloServerURI,
        credentials: 'same-origin'
      })
    ]),
    cache: new InMemoryCache()
  });

  //Add the query to state 
  function addQuery() {
    //"q" represents the user defined query 
    let q = document.getElementById("query").value;

    //packages and sends query to send to the graphQL enpoint through the client established above        
    client.query({
      query: gql`${q}`
    }).then(result => {
      console.log('apollo server result: ', result);
      //saves stringified result to state in the "queries" array
      r = JSON.stringify({data: JSON.stringify(result.data)}) ;
      //writes response from GraphQL to "Response" text box in DOM
      document.getElementById("response").value = r;
      //updating state
      dispatch({ type: UPDATE_QUERIES, payload: [[q], [r]] });
    }).catch(error => {
      //if no graphQLError was returned from apolloClient, assign error to response
      if(r.length == 0){
        r = 'Unknown error occured';
      }  
      document.getElementById("response").value = r;
      dispatch({ type: UPDATE_QUERIES, payload: [[q], [r]] });
    })

  }

  function updateURL() {
    let url = document.getElementById('url').value;
    dispatch({ type: ADD_APOLLO_SERVER_URI, payload: url });
    console.log('test updateURL', apolloServerURI);
  }
  //TODO: Check the user input and maybe ping the endpoint to check that it is live. 


  return (
    <div>
      <Code>
        <Column style={{ gridColumn: "1 / 3", gridRow: "1 / span 1" }}>
          <Title>Test Maker</Title>
          <div style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}>
            <Textbox id="query" placeholder="INSTRUCTIONS: In this view you can create query and response pairs to export as tests. 1) Add the endpoint of your running GraphQL server in the box below:Apollo Server URL  | Enter URL here For example: http://localhost:30002) Click the Add URL button 3) Type your test query in THIS BOX For example: {hero {name}}"></Textbox>
            <Textbox id="response" placeholder="INSTRUCTIONS CONTINUED: Once you have written your test query and added your Apollo Server URL 4) Click the Add Query button below 5) The response to your query will appear in THIS BOX The query / response pair is now ready to be exported as a tests.js file 6) If you want to add additional query /response pairs repeat steps 3 and 4. TO EXPORT your test file click the Export Tests button below."></Textbox>
          </div>
          <div style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}>
            <Button onClick={addQuery}>Add Query</Button>
            <Button onClick={(e) => {
              //Electron meathod to initiate the export dialog. 
              ipc.send('show-test-export-dialog', queries)
            }}> Export Tests </Button>
            <p>{console.log("queries: ", queries)}</p>
          </div>
        </Column>
        <Column style={{ gridColumn: "1 / 3", gridRow: "3 / span 1" }}>
          <Title>GraphQL Endpoint URL</Title>
          <Input type='text' id='url' placeholder='Enter URL here'></Input><Button style={{ width: "20%" }} onClick={updateURL}>Add URL</Button>
        </Column>
      </Code>
    </div>
  );
}

export default TestsView;