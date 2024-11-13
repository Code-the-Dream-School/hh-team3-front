import React from 'react';
import '/src/components/BookCard/BookCard.css'

export default function BookCover({ coverImg }) {
	return (
		<div>
			<img
				src={`../images/${coverImg}`}
				className="book-page-cover book-card-cover"
			/>
		</div>
	);
}