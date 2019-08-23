import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./App";

// ReactDOM.render(     //uncomment for regular serverless rendering
ReactDOM.hydrate(        //uncomment for express rendering
    <App />,
    document.getElementById("root")
);

