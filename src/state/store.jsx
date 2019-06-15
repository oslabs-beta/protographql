import React from 'react';
import * as state from '../state/mockState';

const initialState = state;

export const SET_POP_UP = "SET_POP_UP";
export const SET_SELECTED_TABLE = "SET_SELECTED_TABLE";
export const SET_TABLE_INDEX = "SET_TABLE_INDEX";
export const SET_TABLES = "SET_TABLES";
export const SET_VIEW = "SET_VIEW";

function reducer(state, action) {
  switch (action.type) {
    case "SET_POP_UP":
      return { ...state, popUp: action.payload };

    case "SET_SELECTED_TABLE":
      return { ...state, selectedTable: action.payload };

    case "SET_TABLE_INDEX":
      return { ...state, tableIndex: action.payload };

    case "SET_TABLES":
      return { ...state, tables: action.payload };

    case "SET_VIEW":
      return { ...state, view: action.payload };

    default:
      return state;
  }
}

export const Store = React.createContext("");

export function StoreProvider (props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}