import React from 'react';
export default function BookAuthor({ author }) {
	return (
		<div className="book-details">
			<p className="book-author">Description: {author}</p>
		</div>
	);
}