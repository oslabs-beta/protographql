import React from 'react';
import * as state from '../state/mockState';

const initialState = state;

console.log('Initial State inside the store.jsx: ', initialState);

function reducer (state, action) {
  switch (action.type) {
    case "SET_POPUP":
      return { ...state, popUp: action.payload };

    default:
      return state;
  }
};

export const Store = React.createContext("");

export function StoreProvider (props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>
};