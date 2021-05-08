import "bootstrap/dist/css/bootstrap.min.css";
import * as FCG from "fantasy-content-generator";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

let testChar = FCG.Names.generate({ seed: 'db76b371-2184-4500-9615-f45f54d95c7e' });
console.log(testChar);
