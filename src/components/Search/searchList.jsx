import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookCard from "../BookCard/BookCard";
import PropTypes from "prop-types";
import "./SearchList.css";

function SearchList({ filteredData }) {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12;
	const totalPages = Math.ceil(filteredData.length / itemsPerPage);

	const navigate = useNavigate();

	const handleScrollToTop = (e) => {
		e.preventDefault();
		navigate("/find-book");
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const handlePageClick = (page) => {
		setCurrentPage(page);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const currentData = filteredData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	return (
		<>
			<div className="display">
				{currentData.map((book) => (
					<Link
						to={`/books/${book.id}`}
						style={{ textDecoration: "none" }}
						key={book.id || book._id}
					>
						<BookCard {...book}></BookCard>
					</Link>
				))}
			</div>

			<div className="pagination">
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index + 1}
						className={`button-pagination my-button-pagination ${
							currentPage === index + 1 ? "active" : ""
						}`}
						onMouseDown={() => setCurrentPage(index + 1)}
						onClick={() => handlePageClick(index + 1)}
					>
						Page {index + 1}
					</button>
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
							<i className="fa-solid fa-angles-up mt-5"></i>
						</small>
					</strong>
				</a>
			</div>
		</>
	);
}

SearchList.propTypes = {
  filteredData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SearchList;
