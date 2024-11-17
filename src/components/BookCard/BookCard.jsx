import React from 'react';
import './BookCard.css'

export default function BookCard({
	coverImg,
	author,
	title,
	publishDate,
}) {
	return (
		<div className="card">
			<img
				src={`../images/${coverImg}`}
			
			/>
			<div className="card-body">
				<p className="book-title"> {title}</p>
				<p className="book-author">By {author} </p>
				<p className="book-publish-date">{publishDate}</p>
			</div>
		</div>
	);
}
