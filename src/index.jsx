const React = require("react");
const ReactDOM = require("react-dom");
const { App } = require("./App");

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ipcRenderer } from 'electron';
import { createIpcLink } from 'graphql-transport-electron';
import { gql } from 'apollo-boost';

const link = createIpcLink({ ipc: ipcRenderer });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

console.log("client: ",client)

// testing Apollo Server with query - currently not working
  client.query({
      query: gql`
          {
              getAllAuthor {
                  last_name
              }
          }`
  }).then(result => console.log('apollo server result: ',result)
  .catch(err => console.log("client query error: ", err)))

console.log("client after: ", client)

ReactDOM.render(     
    <App />,
    document.getElementById("root")
);

