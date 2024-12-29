import React from "react";
import "./BookDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookTalks from "../BookTalks/BookTalks.jsx";
import { useNavigate } from "react-router-dom";

export default function BookDetails() {
	const { id } = useParams();
	const [book, setBook] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const handleCreateDiscussion = () => {
		if (!book || !book.id) {
			alert("Book ID is missing!");
			return;
		}
		navigate("/create-discussion", { state: { bookId: book.id } });
	};

	useEffect(() => {
		async function fetchBookDetails() {
			const url = import.meta.env.VITE_API_BASE_URL;
			try {
				const response = await fetch(`${url}/books/${id}`);
				if (!response.ok)
					throw new Error("Failed to fetch book details.");
				const data = await response.json();
				setBook(data.book);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		fetchBookDetails();
	}, [id]);

	if (loading) return <h2>Loading...</h2>;
	if (error) return <h2>Error: {error}</h2>;
	if (!book) return <h2>Book not found.</h2>;

	return (
		<div className="book-details-page">
			<div className="book-details-container">
				<img src={book.imageLinks?.thumbnail} alt={book.title} />
				<div className="book-details">
					<p className="book-title">{book.title}</p>
					<p className="book-author">
						By {book.authors?.join(", ")} (
						{publishedDate.split("-")[0]})
					</p>
					<p className="book-publisher">
						Published by: {book.publisher}
					</p>
					<p className="book-genre">
						{book.categories.map((categories, index) => (
							<span key={index}>{categories}</span>
						))}
					</p>
					<p className="book-description">{book.description}</p>
					<div className="buttons-container">
						<button
							onClick={handleCreateDiscussion}
							className="create-discussions-btn"
						>
							Create Discussion
						</button>
					</div>
				</div>
			</div>
			<BookTalks />
		</div>
	);
}
