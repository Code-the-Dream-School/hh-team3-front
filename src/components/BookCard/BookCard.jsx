import React from "react";
import PropTypes from "prop-types";
import "./BookCard.css";

function BookCard({
	imageLinks = {},
	authors = [],
	title,
	publishedDate,
	children,
}) {
	return (
		<div className="card shadow btn-outline-light">
			<img src={imageLinks?.thumbnail} alt="Book cover" />
			<div className="card-content">
				<p
					className={`card-title ${
						title.length > 18 ? "long-name" : ""
					}`}
				>
					{title}
				</p>
				<p className="card-author">
					By {authors.join(", ")} ({publishedDate?.split("-")[0]})
				</p>
				{children}
			</div>
		</div>
	);
}

BookCard.propTypes = {
	imageLinks: PropTypes.shape({
		thumbnail: PropTypes.string,
	}),
	authors: PropTypes.arrayOf(PropTypes.string),
	title: PropTypes.string.isRequired,
	publishedDate: PropTypes.string,
	children: PropTypes.node,
};

export default BookCard;