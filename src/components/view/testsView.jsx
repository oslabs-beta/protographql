import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../../state/store';
import { UPDATE_QUERIES, ADD_APOLLO_SERVER_URI } from '../../actions/actionTypes';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql, HttpLink } from 'apollo-boost';
import { SET_POP_UP } from '../../actions/actionTypes';

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
  height: 20em;
  border-radius: 5px;
  margin: 0;
  width: 48%;
  margin: 5px;
  font-size: .75em;
`;



/*-------------------- Functional Component --------------------*/

function TestsView() {
    const { dispatch, state: { queries, apolloServerURI }} = useContext(Store);
    
    //Gets the new HttpLink when state is updated 
    //note: initial state is localhost:3000/GraphQL 
    const link = new HttpLink({
        uri: apolloServerURI
      })
      //Creates a new ApolloClient connection using the link above 
      const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: link
      });

      //Add the query to state 
    function addQuery() {
      //"q" represents the user defined query 
        let q = document.getElementById("query").value;
        //"r" represents the response from the GraphQL endpoint
        let r;

        //packages and sends query to send to the graphQL enpoint through the client established above        
        client.query({
            query: gql`${q}`
        }).then(result => {;
            console.log('apollo server result: ',result);
            //saves stringified result to state in the "queries" array
            r = JSON.stringify(result.data);
            //writes response from GraphQL to "Response" text box in DOM
            document.getElementById("response").value = r;
            //FOR FUTURE IMPLEMENTATION we determine the entirety of the data that is sent in a response and parse accordingly
            //currently we only use "data" to update r"
            //updating state
            dispatch({ type: UPDATE_QUERIES, payload: [[q], [r]] });
        })
        
    }

    function updateURL() {
        let url = document.getElementById('url').value;
        if (url.match(/http:\/\/.+/) || url.match(/https:\/\/.+/)) {
          dispatch({ type: ADD_APOLLO_SERVER_URI, payload: url });
          console.log('test updateURL', apolloServerURI);
          document.getElementById('url').value = '';
          document.querySelector('#endpointError').classList.add('invisible');
        } else {
          document.querySelector('#endpointError').classList.remove('invisible');
        }
      }
        

    function showInstructions() {
      // console.log("You clicked the instructions icon/button")
      dispatch({ type: SET_POP_UP, payload: 'instructions'});
    }
    //FOR FUTURE IMPLEMENTATION: Check the user input and maybe ping the endpoint to check that it is live. 


    return(
        <div>
          <Code> 
            <Column style={{ gridColumn: "1 / 3", gridRow: "1 / span 1" }}>
              <Title>Test Maker</Title> 
              <Button onClick={showInstructions} style={{ width: "18%", height: "12%"}}>
              <i className="fas fa-info-circle">     Instructions</i>
              </Button>
              <div style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}>
                <Textbox id="query" placeholder='#Write your query here. For example: {hero {name}}'></Textbox>
                <Textbox id="response" placeholder='Responses from your endpoint will appear here. For example: {"hero": {"name": "Luke Skywalker"}}'></Textbox>
              </div>
              <div style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}>
              <Button onClick={addQuery}>Add Query</Button>
                <Button onClick={(e) => {
                  //Electron meathod to initiate the export dialog. 
                    ipc.send('show-test-export-dialog',queries)
                }}> Export Tests </Button>
                <p>{console.log("queries: ",queries)}</p>
            </div>
            </Column>
            <Column style={{ gridColumn: "1 / 3", gridRow: "3 / span 1" }}>
                  <Title>GraphQL Endpoint URL</Title>
                  <Input type='text' id='url' placeholder='Enter URL here'></Input><Button style={{ width: "20%" }} onClick={updateURL}>Add URL</Button>
                  <p className="invisible" id="endpointError">That is not a valid endpoint.  If no valid endpoint is entered, the endpoint will remain unchanged. The initial value is set to http://localhost:3000/GraphQL</p>
              </Column>
          </Code>
        </div>   
    );
}

export default TestsView;