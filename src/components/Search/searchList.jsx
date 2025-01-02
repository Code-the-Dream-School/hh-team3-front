import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BookCard from "../BookCard/BookCard";
import "./SearchList.css";

function SearchList({ filteredData }) {

	const navigate = useNavigate();

	const handleScrollToTop = (e) => {
		e.preventDefault(); 
		navigate("/find-book");
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<>
			<div className="display">
				{filteredData.map((book) => (
					<Link
						to={`/books/${book.id}`}
						style={{ textDecoration: "none" }}
						key={book.id || book._id}
					>
						<BookCard {...book}></BookCard>
					</Link>
				))}
			</div>
			<div className="text-center">
				<a
					href="/find-book"
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
		</>
	);
}

export default SearchList;
