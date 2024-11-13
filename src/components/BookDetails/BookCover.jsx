import React from 'react';
import '/src/components/BookCard/BookCard.css';

export default function BookCover({ coverImg }) {
	return (
		<img
			src={`../images/${coverImg}`}
			style={{ width: '200px' }}
		/>
	);
}
