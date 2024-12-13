import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import FindABook from "./Pages/FindABook";
import Home from "./Pages/home";
import booksData from "/src/data/booksData.js";
import "./App.css";

const URL = "http://localhost:8000/api/v1/";

function App() {
	if (typeof global === "undefined") {
		window.global = window;
	}
	return (
		<>
			<Router>
				<Navbar />
				<div className="container">
					<Routes>
						<Route path="/find-book" element={<FindABook />} />
						<Route
							path="/"
							element={<Home booksData={booksData} />}
						/>
					</Routes>
				</div>
			</Router>
		</>
	);
}
export default App;
