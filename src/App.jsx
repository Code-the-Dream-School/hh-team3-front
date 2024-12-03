import React, { useState, useEffect } from "react";
import Login from "./Routes/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import booksData from "/src/data/booksData.js";

import Home from "./Pages/home";
import FindABook from "./Pages/FindABook";
const URL = "http://localhost:8000/api/v1/";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/find-book" element={<FindABook />} />
          <Route path="/" element={<Home booksData={booksData} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

