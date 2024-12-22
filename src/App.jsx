import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import FindABook from "./Pages/FindABook";
import Home from "./Pages/home";
import React, { useState, useEffect } from "react";
import BookDetails from "./components/BookDetails/BookDetails";
import Logout from "./components/UserLogout/Logout";
const URL = "http://localhost:8000/api/v1/";

function App() {
	const [books, setBooks] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const url = import.meta.env.VITE_API_BASE_URL;

			try {
				const response = await fetch(`${url}/books`);

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.json();

				if (data.books) {
					const booksData = data.books.map((book) => ({
						id: book.id,
						...book,
					}));
					setBooks(booksData);
				} else {
					throw new Error("Missing 'books' in API response");
				}
			} catch (err) {
				console.error("Error fetching data:", err.message);
				setError(err.message);
			}
		};
		fetchData();
	}, []);

	if (typeof global === "undefined") {
		window.global = window;
	}
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route
						path="/find-book"
						element={<FindABook booksData={books} />}
					/>
					<Route path="/" element={<Home booksData={books} />} />
					<Route path="/books/:id" element={<BookDetails />} />
					<Route path="/logout" element={<Logout />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default App;
