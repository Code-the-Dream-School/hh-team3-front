import React from 'react';
export default function BookDescription({ description }) {
	return (
		<div className="book-details">
			<p className="book-description">
				Description: {description}
			</p>
		</div>
	);
}
