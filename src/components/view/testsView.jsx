import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../../state/store';
import { UPDATE_QUERIES } from '../../actions/actionTypes';
import { ADD_APOLLO_SERVER_URI } from '../../actions/actionTypes';


const electron = window.require('electron');
const ipc = electron.ipcRenderer;

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql, HttpLink } from 'apollo-boost';


/*-------------------- Styled Components --------------------*/

// const Title = styled.h1`
// font-size: 1.5em;
// text-align: center;
// color: palevioletred;
// `;

// const Response = styled.div`
//     margin: 13px;
//     font-family: Courier New, Consolas, Monaco, Lucida Console;
//     font-size: 15px;
//     background-color: #EFF0F1;
//     display: grid;
//     height: calc(100vh - 26px - 64px);
// `;

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
    const { dispatch, state: { queries, apolloServerURI }} = useContext(Store);
    
    const link = new HttpLink({
        uri: apolloServerURI
      })
      
      const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: link
      });

    function addQuery() {
        let q = document.getElementById("query").value;
        let r;

        //creates query to graphQL enpoint
        //saves stringified result to state in the "queries" array
        //writes response from GraphQL to "Response" text box in DOM
        client.query({
            query: gql`${q}`
        }).then(result => {;
            console.log('apollo server result: ',result);
            r = JSON.stringify(result.data);
            document.getElementById("response").value = r;
            dispatch({ type: UPDATE_QUERIES, payload: [[q], [r]] });
        })
        
    }

    function updateURL() {
        let url = document.getElementById('url').value;
        dispatch({ type: ADD_APOLLO_SERVER_URI, payload: url });
        console.log('test updateURL', apolloServerURI);
    }

    return(
        <div>
          <Code> 
            <Column style={{ gridColumn: "1 / 3", gridRow: "1 / span 1" }}>
              <Title>Test Maker</Title> 
              <div style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}>
                <Textbox id="query" placeholder="enter your query here"></Textbox>
                <Textbox id="response" placeholder="enter your expected response here"></Textbox>
              </div>
              <div style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}>
              <Button onClick={addQuery}>Add Query</Button>
                <Button onClick={(e) => {
                    ipc.send('show-test-export-dialog',queries)
                }}> Export Tests </Button>
                <p>{console.log("queries: ",queries)}</p>
            </div>
            </Column>
            <Column style={{ gridColumn: "1 / 3", gridRow: "3 / span 1" }}>
                  <Title>Apollo Server URI</Title>
                  <Input type='text' id='url' placeholder='enter your uri here'></Input><Button style={{ width: "20%" }} onClick={updateURL}>Add URI</Button>
              </Column>
          </Code>
        </div>   
    );
}

export default TestsView;