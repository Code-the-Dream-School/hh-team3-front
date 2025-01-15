import { Route, BrowserRouter, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./Pages/home.jsx";
import Navbar from "./components/NavBar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import FindABook from "./Pages/FindABook.jsx";
import BookDetails from "./components/BookDetails/BookDetails.jsx";
import DiscussionForm from "./components/Discussion/DiscussionForm/DiscussionForm.jsx";
import BookForm from "./components/BookFormforAdmin/BookForm.jsx";
import FindADiscussion from "./Pages/FIndADiscussion";
import Loader from "./components/Loader/Loader.jsx";
import AuthProvider from "./components/Context/AuthProvider.jsx";
import Login from "./components/UserLogin/Login.jsx";
import Signup from "./components/userSignup/Signup.jsx";
import Logout from "./components/UserLogout/Logout.jsx";
import UserPage from "./components/UserPage/userPage.jsx";
import ResetPassword from "./components/ForgotPassword/ResetPassword.jsx";

function App() {
	const [books, setBooks] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [discussions, setDiscussions] = useState([]);

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

	useEffect(() => {
		const fetchDiscussions = async () => {
			const url = import.meta.env.VITE_API_BASE_URL;
			try {
				const response = await fetch(`${url}/discussions`);
				if (!response.ok) {
					throw new Error("Failed to fetch discussions");
				}
				const data = await response.json();

				if (!data.discussions) {
					throw new Error("Missing 'discussions' in API response");
				}

				const discussions = await Promise.all(
					data.discussions.map(async (discussion) => {
						try {
							const bookResponse = await fetch(
								`${url}/books/${discussion.book}`,
							);
							const bookData = bookResponse.ok
								? await bookResponse.json().then(
										(data) =>
											data.book || {
												title: "Unknown Book",
											},
								  )
								: { title: "Unknown Book" };

							const creatorResponse = await fetch(
								`${url}/auth/profile/public?id=${discussion.createdBy}`,
							);
							const creatorResponseJson =
								await creatorResponse.json();

							const creatorData = creatorResponse.ok
								? {
										id: creatorResponseJson.id,
										name:
											creatorResponseJson.name ||
											"Unknown Creator",
								  }
								: { id: "unknown", name: "Unknown Creator" };

							return {
								...discussion,
								book: bookData.title,
								bookImg: bookData.imageLinks.thumbnail,
								createdBy: creatorData.name,
								createdById: creatorData.id,
							};
						} catch (err) {
							console.error(
								"Error processing discussion:",
								err.message,
							);
							return {
								...discussion,
								book: "Unknown Book",
								createdBy: "Unknown Creator",
								participants: [],
							};
						}
					}),
				);

				setDiscussions(discussions);
			} catch (err) {
				console.error("Error fetching data:", err.message);
				setError(err.message);
			}
		};

		fetchDiscussions();
	}, []);

	async function addDiscussion(newDiscussionItem) {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error(
				"Failed to add a discussion. Please log in to continue.",
			);
		}
		setLoading(true);
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
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
			return data;
		} catch (error) {
			console.error("Error adding discussion:", error.message);
			alert(error.message);
		} finally {
			setLoading(false);
		}
	}

	const handleFormSubmit = async (formData) => {
		const newDiscussionItem = {
			...formData,
			participants: [],
			createdBy: " ",
		};

		await addDiscussion(newDiscussionItem);
	};

	async function addBook(newBookItem) {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("Failed to add a book. Please log in to continue.");
		}

		const bookData = {
			title: newBookItem.title,
			description: newBookItem.description,
			publisher: newBookItem.publisher,
			authors: newBookItem.authors
				.split(",")
				.map((author) => author.trim()),
			categories: newBookItem.categories
				.split(",")
				.map((category) => category.trim()),
		};
		let publishedDate = new Date(newBookItem.publishedDate);
		if (isNaN(publishedDate)) {
			console.error("Invalid date format:", newBookItem.publishedDate);
		} else {
			bookData.publishedDate = publishedDate.toISOString();
		}

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(bookData),
		};

		const url = `${import.meta.env.VITE_API_BASE_URL}/books`;

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`Failed to add book: ${response.status}`);
			}
			const addedBook = await response.json();

			if (newBookItem.cover) {
				const coverFormData = new FormData();
				coverFormData.append("file", newBookItem.cover);
				coverFormData.append("bookId", addedBook.book._id);
				const coverUploadUrl = `${
					import.meta.env.VITE_API_BASE_URL
				}/photo/cover`;

				const coverUploadOptions = {
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: coverFormData,
				};

				const coverResponse = await fetch(
					coverUploadUrl,
					coverUploadOptions,
				);
				if (!coverResponse.ok) {
					const errorBody = await coverResponse.text();
					throw new Error(
						`Failed to upload cover: ${coverResponse.status}, ${errorBody}`,
					);
				}

				const coverData = await coverResponse.json();
				addedBook.imageUrl = coverData.imageUrl;
				addedBook.optimizedUrl = coverData.optimizedUrl;
				addedBook.autoCroppedUrl = coverData.autoCroppedUrl;
			}
			return addedBook;
		} catch (error) {
			console.error("Error adding book:", error);
			throw error;
		}
	}

	async function uploadAvatar(userItem) {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("Failed to add a book. Please log in to continue.");
		}

		try {
			if (userItem.avatar) {
				const avatarFormData = new FormData();
				avatarFormData.append("file", userItem.avatar);
				avatarFormData.append("userId", userItem.user._id);
				const avatarUploadUrl = `${
					import.meta.env.VITE_API_BASE_URL
				}/photo/avatar`;

				const avatarUploadOptions = {
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: avatarFormData,
				};

				const avatarResponse = await fetch(
					avatarUploadUrl,
					avatarUploadOptions,
				);
				if (!avatarResponse.ok) {
					const errorBody = await avatarResponse.text();
					throw new Error(
						`Failed to upload avatar: ${avatarResponse.status}, ${errorBody}`,
					);
				}

				const avatarData = await avatarResponse.json();
				return avatarData;
			}
		} catch (error) {
			console.error("Error uploading avatar:", error);
			throw error;
		}
	}

	if (loading) return <Loader />;

	if (typeof global === "undefined") {
		window.global = window;
	}
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<Navbar />
					<div className="container">
						<Routes>
							<Route
								path="/find-book"
								element={<FindABook booksData={books} />}
							/>
							<Route
								path="/find-discussion"
								element={
									<FindADiscussion
										discussionsData={discussions}
									/>
								}
							/>
							<Route
								path="/"
								element={<Home booksData={books} />}
							/>
							<Route
								path="/books/:id"
								element={<BookDetails />}
							/>
							<Route
								path="/create-discussion"
								element={
									<DiscussionForm
										onSubmit={handleFormSubmit}
									/>
								}
							/>
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/logout" element={<Logout />} />
							<Route
								path="/create-book"
								element={<BookForm onAddBook={addBook} />}
							/>
							<Route
								path="/userPage"
								element={
									<UserPage onUploadAvatar={uploadAvatar} />
								}
							/>
							<Route
								path="/reset-password"
								element={<ResetPassword />}
							/>
						</Routes>
					</div>
					<Footer />
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}
export default App;
