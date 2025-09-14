import React from "react";
import { Routes, Route } from "react-router";
import Home from "./views/Home";
import MovieInfo from "./views/MovieInfo";
import Login from "./views/Login";
import Signup from './views/Signup'
import Profile from "./views/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/movies/:_id" element={<MovieInfo/>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/profile/:_id" element={<Profile />}></Route>
    </Routes>
  );
};

export default App;
