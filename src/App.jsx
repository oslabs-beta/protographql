import * as React from "react";
import Main from './container/mainContainer';
import { StoreProvider } from './state/store';

export const App = () => (
    <StoreProvider>
        <Main />
    </StoreProvider>
);