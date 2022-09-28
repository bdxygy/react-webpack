import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/styles.scss";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<div>React App Activated!</div>} />
        <Route path="*" element={<div>Error!</div>} />
      </Route>
    </Routes>
  );
};

export default App;
