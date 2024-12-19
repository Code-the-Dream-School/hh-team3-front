import React from "react";
import "./BookCard.css";

export default function BookCard({
	imageLinks = {},
	authors = [],
	title,
	publishedDate,
	children,
}) {
	return (
		<div className="card">
			<img src={imageLinks?.thumbnail} alt="Book cover" />
			<div className="card-content">
				<p className="card-title">{title}</p>
				<p className="card-author">
					By {authors.join(",")} ({publishedDate.split("-")[0]})
				</p>
				{children}
			</div>
		</div>
	);
}
