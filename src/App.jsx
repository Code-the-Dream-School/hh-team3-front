import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import FindABook from "./Pages/FindABook";
import Home from "./Pages/home";
import { useState, useEffect } from "react";
import BookDetails from "./components/BookDetails/BookDetails";
import DiscussionForm from "./components/Discussion/DiscussionForm/DiscussionForm";
import Login from "./components/UserLogin/Login";
import Signup from "./components/userSignup/Signup";
import AuthProvider from "../src/components/Context/AuthProvider";

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

	const handleFormSubmit = (formData) => {
		console.log("Form Submitted:", formData);
		async function addDiscussion(newDiscussionItem) {
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: newDiscussionItem.title,
					book: newDiscussionItem.book,
					content: newDiscussionItem.content,
					date: newDiscussionItem.date,
					participants: newDiscussionItem.participants,
					meetingLink: newDiscussionItem.meetingLink,
					createdBy: newDiscussionItem.createdBy,
				}),
			};

			const url = import.meta.env.VITE_API_BASE_URL;

			try {
				const response = await fetch(
					`${url}/books/discussions`,
					options,
				);

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
			}
		}
	};

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
					<Route
						path="/create-discussion"
						element={<DiscussionForm onSubmit={handleFormSubmit} />}
					/>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
