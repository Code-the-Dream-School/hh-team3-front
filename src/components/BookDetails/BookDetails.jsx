import React from 'react';
import './BookDetails.css';

export default function BookDetails({
	coverImg,
	author,
	title,
	publishDate,
	description,
	stats,
	genre,
}) {
	return (
		<div className="book-details-container day-theme">
			<img src={`../images/${coverImg}`} alt={title} />
			<div className="book-details">
				<p className="book-title">{title}</p>
				<p className="book-author">
					By {author} ({publishDate})
				</p>
				<span>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-star"></i>(
					{stats.reviewCount})
				</span>
				<p className="book-genre">
					<span>{genre}</span>
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
