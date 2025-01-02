import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import Loader from "../components/Loader/Loader";
import "./Home.css";

function Home({ booksData }) {
	const [randomBook, setRandomBook] = useState(null);

	const navigate = useNavigate();

	const handleScrollToTop = (e) => {
		e.preventDefault();
		navigate("/");
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

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

	if (!randomBook)
		return (
			<div>
				<Loader style={{ padding: "300px" }} />
			</div>
		);

	return (
		<div className="home">
			<main className="d-flex flex-column-reverse flex-md-row justify-content-between align-items-center">
				<section className="welcome">
					<h1 className="mb-4">Welcome to BookTalk</h1>
					<h4 className="mb-3">
						Dive Into a World of Books and Conversations!
					</h4>
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
						and plots that intrigue you most.
					</p>
					<p>
						<strong>Join ongoing conversations</strong> to share
						your thoughts, ask questions, and connect with
						like-minded individuals who share your love for
						literature.
					</p>
					<p>
						Whether you're a fan of fiction, non-fiction, fantasy,
						or mystery, there's a place for you here.
					</p>
					<p>
						<strong>Connect with new friends</strong>, exchange
						recommendations, and explore books in ways you never
						have before.
					</p>
					<h4 className="mt-4">
						Start talking, start reading, start connecting — all in
						one place.
					</h4>
				</section>

				<section className="book-of-the-month">
					<h4>What&apos;s Behind the Pages?</h4>
					<h4 className="mb-4">Let&apos;s Discuss!</h4>
					<div className="book-of-the-month-card">
						<img
							src={randomBook.imageLinks?.thumbnail}
							alt={randomBook.title}
							className="book-of-the-month-card-img"
						/>
						<div>
							<h5 className="book-of-the-month-card-title">
								{randomBook.title}
							</h5>
							<p className="book-of-the-month-card-author">
								By {randomBook.authors.join(", ")} (
								{randomBook.publishedDate.split("-")[0]})
							</p>
						</div>
					</div>
				</section>
			</main>

			<section className="links d-flex flex-wrap justify-content-center gap-4 my-5">
				<Link
					className="btn btn-outline-light book-btn d-flex flex-column align-items-center p-4 shadow"
					to="/find-discussion"
					style={{ width: "300px" }}
					rel="noopener noreferrer"
				>
					<h3 className="link-text mb-3">Discussions to join</h3>
					<img
						src="/images/find_discussion.jpeg"
						alt="Discussion Icon"
						className="rounded"
						width="100%"
					/>
				</Link>

				<Link
					className="btn btn-outline-light book-btn d-flex flex-column align-items-center p-4 shadow"
					to="/find-book"
					style={{ width: "300px" }}
					rel="noopener noreferrer"
				>
					<h3 className="link-text mb-3">Discover new books</h3>
					<img
						src="/images/find_book.jpeg"
						alt="Book Icon"
						className="rounded"
						width="100%"
					/>
				</Link>

				<Link
					className="btn btn-outline-light book-btn d-flex flex-column align-items-center p-4 shadow"
					to="/create-discussion"
					style={{ width: "300px" }}
					rel="noopener noreferrer"
				>
					<h3 className="link-text mb-3">Create discussion</h3>
					<img
						src="/images/create_discussion.jpeg"
						alt="Create discussion Icon"
						className="rounded"
						width="100%"
					/>
				</Link>
			</section>
			<div className="text-center">
				<a
					href="/"
					className="text-shadow up-link"
					rel="noopener noreferrer"
					onClick={handleScrollToTop}
				>
					<strong>
						<small>
							<i className="fa-solid fa-angles-up"></i>
						</small>
					</strong>
				</a>
			</div>
		</div>
	);
}

export default Home;
