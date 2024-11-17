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
		<div className="book-details-container day-theme">
			<img src={`../images/${coverImg}`} />
			<div className="book-details">
				<p className="book-title">{title}</p>
				<p className="book-author">
					By {author} ({publishDate})
				</p>
				<p className="book-description">{description}</p>
				<div className="buttons-container">
					<button className="create-discussions-btn">
						Create Discussion
					</button>
					<button className="join-discussions-btn">
						Join Discussion
					</button>
				</div>
			</div>
		</div>
	);
}
