import * as React from "react";
export interface AppProps { compiler: string; framework: string; }

export const App = (props: AppProps) => <h1>Check Hello from {props.compiler} and {props.framework}!</h1>;