import "bootstrap/dist/css/bootstrap.min.css";
import * as FCG from "fantasy-content-generator";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

let testChar = FCG.NPCs.generate({seed: "15ba4bcb-1da6-466a-9f86-e96711e15af0"});
console.log(testChar);
