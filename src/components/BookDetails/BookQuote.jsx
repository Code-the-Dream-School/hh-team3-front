import React from 'react';
export default function BookQuote({ quote }) {
	return (
		<div className="book-details">
			<p className="book-quote">Quote: {quote}</p>
		</div>
	);
}
