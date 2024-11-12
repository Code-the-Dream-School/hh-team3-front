import React from 'react';
import BookCardBody from './BookCardBody.jsx';
import BookCardHeader from './BookCardHeader.jsx';
import './BookCardMain.css';

export default function BookCardMain({
	coverImg,
	title,
	publishDate,
	quote,
}) {
	return (
		<div className="book-card">
			<BookCardHeader coverImg={coverImg} />
			<BookCardBody
				title={title}
				publishDate={publishDate}
				quote={quote}
			/>
		</div>
	);
}
