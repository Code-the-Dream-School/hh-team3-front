import React from 'react';
import './BookCard.css';

export default function BookCardHeader({ coverImg }) {
	return (
		<img
			src={`../images/${coverImg}`}
			className="book-card-cover"
		/>
	);
}
