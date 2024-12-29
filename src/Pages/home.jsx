import React, { useEffect, useState } from "react";
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

		const interval = setInterval(pickRandomBook, 15000);

		return () => clearInterval(interval);
	}, [booksData]);

	if (!randomBook) return <p>Loading...</p>;

	return (
		<div className="home">
			<div className="book-of-the-month">
				<h4>What’s Behind the Pages?</h4>
				<h4>Let’s Discuss!</h4>
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
							{randomBook.publishedDate.split("-")[0]})
						</p>
					</div>
				</div>
			</div>
			<div className="container mt-5">
				<div className="welcome-section">
					<h1 className="my-text">Welcome to BookTalk</h1>
					<br></br>
					<h4>Dive Into a World of Books and Conversations!</h4>
					<p>
						Our platform brings together book lovers from around the
						world, giving you the perfect space to share your
						passion for reading. Whether you're looking to discuss
						your latest read or discover new books through others'
						perspectives, we offer a unique experience where you can
						create or join engaging book discussions.
					</p>
					<p>
						<strong>Create your own discussions</strong> and invite
						fellow readers to dive deep into the themes, characters,
						and plots that intrigue you most.{" "}
					</p>
					<p>
						<strong>Join ongoing conversations</strong> to share
						your thoughts, ask questions, and connect with
						like-minded individuals who share your love for
						literature.
					</p>
					<p>
						Whether you're a fan of fiction, non-fiction, fantasy,
						or mystery, there's a place for you here.{" "}
					</p>
					<p>
						<strong>Connect with new friends</strong>, exchange
						recommendations, and explore books in ways you never
						have before.
					</p>
					<h4>
						Start talking, start reading, start connecting — all in
						one place.
					</h4>
					<br></br>
				</div>
				<div className="mt-5 d-flex">
					<Link
						className="btn btn-outline-light book-btn d-flex flex-column align-items-center me-3"
						to="/find-discussion"
					>
						<h3>Find a discussion to join</h3>
						<img
							src="/images/find_discussion.jpeg"
							alt="Discussion Icon"
							className="me-2"
							width="300"
							height="300"
						/>
					</Link>

					<Link
						className="btn btn-outline-light book-btn d-flex flex-column align-items-center"
						to="/find-book"
					>
						<h3>Discover new books</h3>
						<img
							src="/images/find_book.jpeg"
							alt="Book Icon"
							className="me-2"
							width="300"
							height="300"
						/>
					</Link>

					<Link
						className="btn btn-outline-light book-btn d-flex flex-column align-items-center"
						to="/create-discussion"
					>
						<h3>Create discussion</h3>
						<img
							src="/images/create_discussion.jpeg"
							alt="Create discussion Icon"
							className="me-2"
							width="300"
							height="300"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;
