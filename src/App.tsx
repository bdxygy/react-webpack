import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/styles.scss";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello Buddy!</h1>}/>
    </Routes>
  );
};

export default App;
