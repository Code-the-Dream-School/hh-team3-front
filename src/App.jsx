import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import BookDetails from "./components/BookDetails/BookDetails";
import AuthProvider from "./components/Context/AuthProvider";
import DiscussionForm from "./components/Discussion/DiscussionForm/DiscussionForm";
import Footer from "./components/Footer/Footer.jsx";
import Loader from "./components/Loader/Loader.jsx";
import Navbar from "./components/NavBar/Navbar";
import Login from "./components/UserLogin/Login";
import Logout from "./components/UserLogout/Logout";
import Signup from "./components/userSignup/Signup";
import FindABook from "./Pages/FindABook";
import Home from "./Pages/Home.jsx";

function App() {
	const [books, setBooks] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	books;

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
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
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	async function addDiscussion(newDiscussionItem) {
		setLoading(true);
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newDiscussionItem),
		};

		const url = import.meta.env.VITE_API_BASE_URL;

		try {
			const response = await fetch(`${url}/discussions`, options);

			if (!response.ok) {
				const errorDetails = await response.json();

				switch (errorDetails.message) {
					case "Invalid input data":
						throw new Error(
							"The input data provided is invalid. Please check the fields and try again.",
						);
					case "User is not authenticated":
						throw new Error(
							"You are not authenticated. Please log in and try again.",
						);
					case "An unexpected error occurred. Please try again later.":
						throw new Error(
							"Something went wrong on the server. Please try again later.",
						);
					default:
						throw new Error(
							errorDetails.message ||
								"An unknown error occurred.",
						);
				}
			}

			const data = await response.json();
			console.log("Added Discussion:", data);
			return data;
		} catch (error) {
			console.error("Error adding discussion:", error.message);
			alert(error.message);
		} finally {
			setLoading(false);
		}
	}

	const handleFormSubmit = (formData) => {
		const newDiscussionItem = {
			...formData,
			participants: [],
			createdBy: " ",
		};

		addDiscussion(newDiscussionItem);
	};

	if (loading) return <Loader />;

	if (typeof global === "undefined") {
		window.global = window;
	}

	return (
		<AuthProvider>
			<Router>
				<Navbar />
				<div className="container">
					<Routes>
						<Route
							path="/find-book"
							element={<FindABook booksData={books} />}
						/>
						<Route path="/" element={<Home booksData={books} />} />
						<Route path="/books/:id" element={<BookDetails />} />
						<Route
							path="/create-discussion"
							element={
								<DiscussionForm onSubmit={handleFormSubmit} />
							}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/logout" element={<Logout />} />
					</Routes>
				</div>
				<Footer />
			</Router>
		</AuthProvider>
	);
}

export default App;
