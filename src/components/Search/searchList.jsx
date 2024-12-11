import React from "react";
import BookCard from "../BookCard/BookCard";
import "./search.css";
import { Link } from "react-router-dom";

function SearchList({ filteredData }) {
	return (
		<div className="display">
			{filteredData.map((book) => (
				<BookCard key={book.id} {...book}>
					<Link to={`/books/${book.id}`}>
						<button>View Details</button>
					</Link>
				</BookCard>
			))}
		</div>
	);
}

export default SearchList;
