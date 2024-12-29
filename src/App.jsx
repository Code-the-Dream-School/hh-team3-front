import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "../src/components/Context/AuthProvider";
import BookDetails from "./components/BookDetails/BookDetails";
import DiscussionForm from "./components/Discussion/DiscussionForm/DiscussionForm";
import Navbar from "./components/NavBar/Navbar";
import Login from "./components/UserLogin/Login";
import Logout from "./components/UserLogout/Logout";
import Signup from "./components/userSignup/Signup";
import FindABook from "./Pages/FindABook";
import Home from "./Pages/home";
import "./App.css";

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
		<AuthProvider>
			<BrowserRouter>
				<Navbar />
				<div className="container">
					<Routes>
						<Route
							path="/find-book"
							element={<FindABook booksData={books} />}
						/>
						<Route path="/" element={<Home booksData={books} />} />
						<Route path="/books/:id" element={<BookDetails />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
