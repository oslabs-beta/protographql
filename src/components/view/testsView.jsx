import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../../state/store';
import { UPDATE_QUERIES } from '../../actions/actionTypes';

// const electron = window.require('electron');
// const ipc = electron.ipcRenderer;


import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql, HttpLink } from 'apollo-boost';


// const link = new HttpLink({
//     uri: 'http://localhost:3000/GraphQL'
//   })
  
//   const client = new ApolloClient({
//     cache: new InMemoryCache(),
//     link: link
//   });

// console.log("client: ",client)

// // testing Apollo Server with query - currently not working
// client.query({
    // query: gql`
    //     {
    //         getAllAuthor {
    //             last_name
    //         }
    //     }`
// }).then(result => console.log('apollo server result: ',result))

// console.log("client after: ", client)

/*-------------------- Styled Components --------------------*/

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

/*
The following styles mimic the styles in codeView
*/

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

const Title2 = styled.p`
  font-size: 20px;
  color: rgba(221, 57, 156, 1);
  font-family: "Roboto", sans-serif;
  padding-bottom: 15px;
`;

/* The following style mimics button styles from tableForm */
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
  width: 30%;
  text-align: center;
  &:hover {
    background-color: #DD399C;
    cursor: pointer;
  }
`;

/* Mimicked from tableInput */
const Input = styled.input`
  height: 2.5em;
  border-radius: 5px;
  margin: 0;
  width: 90%;
  margin: 5px;
  font-size: .75em;
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
        client.query({
            query: gql`${q}`
        }).then(result => {;
            console.log('apollo server result: ',result);
            r = JSON.stringify(result.data);
            document.getElementById("response").value = r;
            dispatch({ type: UPDATE_QUERIES, payload: [[q], [r]] });
        })
        // let r = document.getElementById("response").value;
        
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
            <p>{console.log("queries: ",queries)}</p>
            <Code>
                <Column style={{ gridColumn: "1 / 3", gridRow: "1 / 1" }}>
                    <Title2>Apollo Server URI</Title2>
                    <Input type='text' placeholder='enter your uri here'></Input><Button>Add URI</Button>
                </Column>
            </Code>
        </div>
        
    );
}

export default TestsView;