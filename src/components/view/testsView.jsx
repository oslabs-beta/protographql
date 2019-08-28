import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../../state/store';
import {
    UPDATE_QUERIES
} from '../../actions/actionTypes';
import buildENV from '../../utils/buildENV';


const electron = window.require('electron');
const ipc = electron.ipcRenderer;


import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql, HttpLink } from 'apollo-boost';

const Title = styled.h1`
font-size: 1.5em;
text-align: center;
color: palevioletred;
`;

const Response = styled.div`
    margin: 13px;
    font-family: Courier New, Consolas, Monaco, Lucida Console;
    font-size: 15px;
    background-color: #EFF0F1;
    display: grid;
    height: calc(100vh - 26px - 64px);
`;

function TestsView() {
    const { dispatch, state: { queries }} = useContext(Store);


    const link = new HttpLink({
        uri: 'http://localhost:3000/GraphQL'
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

    return(
        <div>
            <Title>
                This is the title. 
            </Title> 
            <textarea id="query" rows="20" cols="50">
            ENTER QUERY    
            </textarea>
            <textarea id="response" rows="20" cols="50">
            EXPECTED RESPONSE    
            </textarea>
            <button onClick={addQuery}>Add Query</button>
            <button onClick={(e) => {
                ipc.send('show-test-export-dialog',queries)
            }}> Export Tests </button>
            <p>{console.log("queries: ",queries)}</p>
        </div>
         
    );
}

export default TestsView;