import React from 'react';
import './BookDetails.css';

export default function BookDetails({
	coverImg,
	authors,
	title,
	publishDate,
	description,
	categories,
}) {
	return (
		<div className="book-details-container day-theme">
			<img src={`../images/${coverImg}`} alt={title} />
			<div className="book-details">
				<p className="book-title">{title}</p>
				<p className="book-author">
					{Array.isArray(authors)
						? `By ${authors.join(', ')}`
						: `By ${authors || 'Unknown Author'}`}{' '}
					{publishDate
						? `(${publishDate})`
						: '(No publish date)'}
				</p>
				<p className="book-genre">
					{Array.isArray(categories)
						? categories.map((category, index) => (
								<span key={index}>{category}</span>
						  ))
						: typeof categories === 'string'
						? categories
								.split(' ')
								.map((category, index) => (
									<span key={index}>{category}</span>
								))
						: ''}
				</p>
				<p className="book-description">{description}</p>
				<div className="buttons-container">
					<button className="create-discussions-btn">
						Create Discussion
					</button>
				</div>
			</div>
		</div>
	);
}
