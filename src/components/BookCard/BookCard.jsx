import React from 'react';
import BookPublishDate from '../BookDetails/BookPublishDate';
import BookQuote from '../BookDetails/BookQuote';
import BookAuthor from '/src/components/BookDetails/BookAuthor.jsx';
import BookTitle from '/src/components/BookDetails/BookTitle.jsx';

export default function BookCardMain({
	coverImg,
	title,
	publishDate,
	quote,
	author,
}) {
	return (
		<div className="card">
			<header>
				<img
					src={`../images/${coverImg}`}
					className="book-card-cover"
				/>
			</header>
			<div className="card-body">
				<BookTitle title={title} />
				<BookAuthor author={author} />
				<BookPublishDate publishDate={publishDate} />
				<BookQuote quote={quote} />
			</div>
		</div>
	);
}
