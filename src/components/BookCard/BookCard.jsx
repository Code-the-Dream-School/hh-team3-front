import React from "react";
import "./BookCard.css";

export default function BookCard({
  imageLinks = {},
  authors = [],
  title,
  publishedDate,
}) {

	return (
		<div className="card">
			<img src={`../images/${imageLinks.thumbnail}`} alt="Book cover" />
			<div className="card-content">
				<p className="card-title"> {title}</p>
				<p className="book-author">
					By {authors.join(', ')} {publishDate}
				</p>
			</div>
		</div>
	);
}
