import React from 'react';
import './BookCard.css';

export default function BookCard({
	coverImg,
	author,
	title,
	publishDate,
}) {
	return (
		<div className="card day-theme">
			<img src={`../images/${coverImg}`} />
			<div className="card-content">
				<p className="card-title"> {title}</p>
				<p className="card-author">
					By {author} ({publishDate})
				</p>
			</div>
		</div>
	);
}
