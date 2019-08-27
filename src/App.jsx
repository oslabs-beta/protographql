import * as React from "react";
import Main from './container/mainContainer';
import { StoreProvider } from './state/store';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql, HttpLink } from 'apollo-boost';

// const link = createIpcLink({ ipc: ipcRenderer });

const link = new HttpLink({
  uri: 'http://localhost:3000/GraphQL'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
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
}).then(result => console.log('apollo server result: ',result))

console.log("client after: ", client)

export const App = () => (
    <StoreProvider>
        <Main />
    </StoreProvider>
);