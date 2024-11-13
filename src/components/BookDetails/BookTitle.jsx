import React from 'react';
export default function BookTitle({ title }) {
	return (
		<div className="book-details">
			<p className="book-title">Title: {title}</p>
		</div>
	);
}