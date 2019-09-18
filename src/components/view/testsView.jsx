import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Store } from '../../state/store';
import { UPDATE_QUERIES, ADD_APOLLO_SERVER_URI } from '../../actions/actionTypes';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SET_POP_UP } from '../../actions/actionTypes';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { HttpLink, gql } from 'apollo-boost'
// import { flattenDiagnosticMessageText } from 'typescript';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

/*-------------------- Styled Components --------------------*/

// styles the application window
const Code = styled.div`
  margin: 13px;
  font-family: Courier New, Consolas, Monaco, Lucida Console;
  font-size: 15px;
  background-color: #EFF0F1;
  display: grid;
  height: calc(100vh - 26px - 64px);
`;

// styles each white card
const Column = styled.div`
  background-color: white;
  margin: 10px;
  padding: 10px;
  height: auto;
  overflow: scroll;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.12);
  position: relative;
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

// styles the titles
const Title = styled.p`
  font-size: 20px;
  color: rgba(221, 57, 156, 1);
  font-family: "Roboto", sans-serif;
  padding-bottom: 15px;
`;

// base style for button components
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

// styles uri input
const Input = styled.input`
  height: 2.5em;
  border-radius: 5px;
  margin: 0;
  width: 75%;
  margin: 2.5em auto;
  font-size: .75em;
`;

// styles textboxes in left column
const Textbox = styled.textarea`
  height: 20em;
  border-radius: 5px;
  margin: 0;
  width: 98%;
  margin: 5px auto;
  font-size: .75em;
`;

/*-------------------- Functional Component --------------------*/
// const { dispatch, state: { queries, apolloServerURI } } = useContext(Store);

// tests user input against endpoint
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

  // Adds the query to state 
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

// toggles the instructions pop up
function showInstructions() {
  // console.log("You clicked the instructions icon/button")
  dispatch({ type: SET_POP_UP, payload: 'instructions'});
}

// updates the endpoint url in state when submit button is clicked
function updateURL() {
  let url = document.getElementById('url').value;
  if (url.match(/http:\/\/.+/) || url.match(/https:\/\/.+/)) {
    dispatch({ type: ADD_APOLLO_SERVER_URI, payload: url });
    console.log('test updateURL', apolloServerURI);
    document.querySelector('#endpointStatus').innerHTML = `Current endpoint: ${document.getElementById('url').value}`;
    document.querySelector('#endpointStatus').classList.remove('invisible');
    document.getElementById('url').value = '';
  } else {
    document.querySelector('#endpointStatus').innerHTML = "Endpoint must include http:// or https://";
    document.querySelector('#endpointStatus').classList.remove('invisible');
  }    
}

useEffect(() => {
  let display = '';
  for(let i = 0; i < queries[0].length; i++) {
    display += `<p>${queries[0][i]}</p>`;
  }
  document.getElementById("queriesDisplay").innerHTML = display;
});

    
/*-------------------- Functional Component Rendering --------------------*/
//FOR FUTURE IMPLEMENTATION: Check the user input and maybe ping the endpoint to check that it is live. 
return(
    <div>
      <Code> 
        <Column style={{ gridColumn: "1 / span 4", gridRow: "1 / span 1" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ flexBasis: "15%" }}>
              <Button onClick={showInstructions} style={{ width: "100%", height: "100%" }}>
              <i className="fas fa-info-circle"> Instructions</i>
              </Button>
            </div>
            <div style={{ flexBasis: "80%", lineHeight: ".01em" }}>
              <Input type='text' id='url' placeholder='Enter Your Custom GraphQL Endpoint URL here'></Input><Button style={{ width: "20%" }} onClick={updateURL}>Add URL</Button>
              <p className="invisible" id="endpointStatus">Current endpoint: </p>
            </div>
          </div>
        </Column>
        <Column style={{ gridColumn: "1 / span 2", gridRow: "2 / span 1" }}>
          <Title>Insert Your Query Here</Title>
            <Textbox id="query" placeholder='#Write your query here. For example: {hero {name}}' style={{ borderBottomRightRadius: "0", borderBottomLeftRadius: "0" }}></Textbox>
            <Button onClick={addQuery} style={{width: "99%", margin: "-10px auto 35px", borderRadius: "0"}}>Add Query</Button>
            <Title>View Your Query Response Below</Title>
            <Textbox id="response" placeholder='Responses from your endpoint will appear here. For example: {"hero": {"name": "Luke Skywalker"}}'></Textbox>
        </Column>
        <Column style={{ gridColumn: "3 / span 2", gridrow: "2 / span 1" }}>
          <Title>Test Queries to Export</Title>
          <div id="queriesDisplay"></div>
          <Button onClick={(e) => {
              //Electron method to initiate the export dialog. 
                ipc.send('show-test-export-dialog',queries)
            }}  style={{ position: "absolute", bottom: "0", width: "98%", margin: "8px auto", borderRadius: "0" }}> Export Tests </Button>
        </Column>
      </Code>
    </div>   
  );
}
export default TestsView;