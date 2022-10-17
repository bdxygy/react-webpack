import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

  
console.log(process.env.MODE, "mode");

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
