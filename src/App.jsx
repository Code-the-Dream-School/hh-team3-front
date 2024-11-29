import React, { useState, useEffect } from "react";
import { getAllData } from "./util/index";
import Login from "./Routes/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import BookCard from "/src/components/BookCard/BookCard.jsx";
import BookDetails from "/src/components/BookDetails/BookDetails.jsx";
import booksData from "/src/data/booksData.js";

const URL = "http://localhost:8000/api/v1/";

function App() {
  const cards = booksData.map((item) => {
    return <BookCard key={item.id} {...item} />;
  });

  const books = booksData.map((item) => {
    return <BookDetails key={item.id} {...item} />;
  });

  useEffect(() => {
    (async () => {
      const myData = await getAllData(URL);
      setMessage(myData.data);
    })();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/find-book"
            element={<BookCard booksData={booksData} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

