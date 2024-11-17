import React from 'react';
import './BookDetails.css';

export default function BookDetails({
	coverImg,
	author,
	title,
	publishDate,
	description,
}) {
	return (
		<div className="book-details-container">
			<img src={`../images/${coverImg}`} />
			<div className="book-details">
				<p className="book-title"> {title}</p>
				<p className="book-author">By {author} </p>
				<p className="book-publish-date">{publishDate}</p>
				<p className="book-description">{description}</p>
				<button className="create-discussions-btn">
					Create discussion
				</button>
			</div>
		</div>
	);
}
