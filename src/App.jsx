import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import FindABook from "./Pages/FindABook";
import Home from "./Pages/home";
import booksData from "/src/data/booksData.js";
import Login from "./components/UserLogin/Login";
import AuthProvider from "../src/components/Context/AuthProvider";

function App() {
	if (typeof global === "undefined") {
		window.global = window;
	}

	return (
		<AuthProvider>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/find-book" element={<FindABook />} />
					<Route path="/" element={<Home booksData={booksData} />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
