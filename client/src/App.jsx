import React from "react";
import { Routes, Route } from "react-router";
import Home from "./views/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
};

export default App;
