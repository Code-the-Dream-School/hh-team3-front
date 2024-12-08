import React from "react";
import BookTalks from "../BookTalks/BookTalks.jsx";
import "./BookDetails.css";

export default function BookDetails({
	imageLinks = {},
	authors = [],
	title,
	publishedDate,
	description,
	categories = [],
}) {
	return (
		<div className="book-details-page">
			<div className="book-details-container day-theme">
				<img
					src={`../images/${imageLinks.thumbnail}`}
					alt="Thumbnail"
				/>
				<div className="book-details">
					<p className="book-title">{title}</p>

					<p className="book-author">
						By {authors.join(", ")} ({publishedDate})
					</p>
					<p className="book-genre">
						{categories.map((categories, index) => (
							<span key={index}>{categories}</span>
						))}
					</p>
					<p className="book-description">{description}</p>
					<div className="buttons-container">
						<button className="create-discussions-btn">
							Create Discussion
						</button>
					</div>
				</div>
			</div>
			<BookTalks />
		</div>
	);
}
