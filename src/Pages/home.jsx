import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BookCard from "../components/BookCard/BookCard.jsx";
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
	}, [booksData]);

	if (!randomBook)
		return (
			<div>
				<Loader />
			</div>
		);

	return (
		<div className="home">
			<main className="row mx-auto">
				<section className="col-lg-5 col-md-12 text-center text-lg-start welcome">
					<h1>Welcome to</h1>
					<h1 className="book-talk">BookTalk</h1>
					<h5 className="fst-italic">
						Find like-minded people to discuss what you&apos;ve read
						recently
					</h5>
					<div className="home-buttons-container">
						<button
							className="btn home-find-book-button"
							onClick={() => navigate("./find-book")}
						>
							Explore Books
						</button>
						<button
							className="btn home-find-book-button"
							onClick={() => navigate("./find-discussion")}
						>
							Discussions
						</button>
					</div>
				</section>

				<section className="book-of-the-month col-lg-7 col-md-12 text-center mt-3">
					<h2>Book of the Month</h2>
					<h4 className="fst-italic fw-bold">
						What&apos;s Behind the Pages?
					</h4>
					<h4 className="mb-4 fst-italic fw-bold">
						Let&apos;s Discuss!
					</h4>
					<Link
						className="book-of-the-month-card"
						style={{ textDecoration: "none" }}
						to={`/books/${randomBook.id || randomBook._id}`}
					>
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
					</Link>
				</section>
			</main>

			<section className="paragraph px-3 px-lg-5">
				<h4 className="mb-3 fst-italic fw-bold text-center">
					Dive Into a World of Books and Conversations!
				</h4>
				<p>
					Our platform brings together book lovers from around the
					world, giving you the perfect space to share your passion
					for reading. Whether you&apos;re looking to discuss your
					latest read or discover new books through others&apos;
					perspectives, we offer a unique experience where you can
					create or join engaging book discussions.
				</p>
				<p>
					<strong className="fst-italic">
						Create your own discussions
					</strong>{" "}
					and invite fellow readers to dive deep into the themes,
					characters, and plots that intrigue you most.
				</p>
				<p>
					<strong className="fst-italic">
						Join ongoing conversations
					</strong>{" "}
					to share your thoughts, ask questions, and connect with
					like-minded individuals who share your love for literature.
				</p>
				<p>
					Whether you&apos;re a fan of fiction, non-fiction, fantasy,
					or mystery, there&apos;s a place for you here.
				</p>
				<p>
					<strong className="fst-italic">
						Connect with new friends
					</strong>
					, exchange recommendations, and explore books in ways you
					never have before.
				</p>
				<h4 className="mt-4 fst-italic fw-bold text-center">
					Start talking, start reading, start connecting — all in one
					place.
				</h4>
			</section>

			<section className="book-slider">
				<h2 className="mb-4">Explore Popular Books</h2>
				<Swiper
					modules={[Navigation, Pagination]}
					navigation
					pagination={{ clickable: true }}
					spaceBetween={20}
					slidesPerView={3}
					breakpoints={{
						640: { slidesPerView: 1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
				>
					{booksData.slice(0, 7).map((book) => (
						<SwiperSlide key={book.id || book._id}>
							<BookCard
								imageLinks={book.imageLinks}
								authors={book.authors}
								title={book.title}
								publishedDate={book.publishedDate}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</section>

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
					to="/discussion-questions-guide"
					style={{ width: "300px" }}
					rel="noopener noreferrer"
				>
					<h3 className="link-text mb-3">Discussion Guide</h3>
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
					className="text-shadow"
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

Home.propTypes = {
	booksData: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			_id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			authors: PropTypes.arrayOf(PropTypes.string).isRequired,
			publishedDate: PropTypes.string.isRequired,
			imageLinks: PropTypes.shape({
				thumbnail: PropTypes.string.isRequired,
			}).isRequired,
		}),
	).isRequired,
};

export default Home;
