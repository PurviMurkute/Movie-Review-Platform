import React from "react";
import { Routes, Route } from "react-router";
import Home from "./views/Home";
import MovieInfo from "./views/MovieInfo";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/movies/:_id/:title" element={<MovieInfo/>}></Route>
    </Routes>
  );
};

export default App;
