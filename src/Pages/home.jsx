import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home({ booksData }) {
	const [randomBook, setRandomBook] = useState(null);

	useEffect(() => {
		const pickRandomBook = () => {
			const book =
				booksData[Math.floor(Math.random() * booksData.length)];
			setRandomBook(book);
		};
		pickRandomBook();

		const interval = setInterval(pickRandomBook, 5000);

		return () => clearInterval(interval);
	}, [booksData]);

	if (!randomBook) return <p>Loading...</p>;

	return (
		<div className="day-theme background">
			<div className="book-of-the-month">
				<h3>Book of the Month</h3>
				<p>Quote: {randomBook.quote}</p>
				<div key={randomBook.id} className="card">
					<img
						src={randomBook.imageLinks?.thumbnail}
						alt="Books"
						className="img-fluid"
					/>
					<div className="card-content">
						<p className="card-title">{randomBook.title}</p>
						<p className="card-author">
							By {randomBook.authors.join(",")} (
							{randomBook.publishedDate})
						</p>
					</div>
				</div>
			</div>
			<div className="container mt-5">
				<div className="welcome-section">
					<h1 className="my-text">Welcome to BookTalk</h1>
					<p>
						Online library with social networking features where you
						can read your favorite books
					</p>
					<p> And discuss them with your new mates.</p>
				</div>
				<div className="mt-5">
					<Link
						className="btn btn-outline-light book-btn me-4 "
						to="/find-discussion"
					>
						Find a discussion to Join
					</Link>
					<Link
						className="btn btn-outline-light book-btn"
						to="/discover-books"
					>
						Discover new books
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;
