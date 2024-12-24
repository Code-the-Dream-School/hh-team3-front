import React from "react";
import { Link } from "react-router-dom";
import BookCard from "../BookCard/BookCard";
import "./search.css";

function SearchList({ filteredData }) {
	return (
		<div className="display">
			{filteredData.map((book) => (
				<Link
					to={`/books/${book.id}`}
					style={{ textDecoration: "none" }}
				>
					<BookCard key={book.id || book._id} {...book}></BookCard>
				</Link>
			))}
		</div>
	);
}

export default SearchList;
