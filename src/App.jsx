import * as React from "react";
import Main from './container/mainContainer';
import { StoreProvider } from './state/store';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ipcRenderer } from 'electron';
import { createIpcLink } from 'graphql-transport-electron';
 
const link = createIpcLink({ ipc: ipcRenderer });
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export const App = () => (
    <StoreProvider>
        <Main />
    </StoreProvider>
);