import React from "react";
import { Routes, Route } from "react-router";
import Home from "./views/Home";
import MovieInfo from "./views/MovieInfo";
import Login from "./views/Login";
import Signup from './views/Signup'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/movies/:_id/:title" element={<MovieInfo/>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  );
};

export default App;
