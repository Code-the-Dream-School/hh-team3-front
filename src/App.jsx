import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import booksData from "/src/data/booksData.js";
import Home from "./Pages/home";
import FindABook from "./Pages/FindABook";
import './App.css'
const URL = "http://localhost:8000/api/v1/";

function App() {
  if (typeof global === 'undefined'){
    window.global = window;
  }
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path="/find-book" element={<FindABook />} />
          <Route path="/" element={<Home booksData={booksData} />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
