import React from 'react';
import BookCardBody from './BookCardBody.jsx';
import BookCardHeader from './BookCardHeader.jsx';
import './BookCardMain.css';

export default function BookCardMain(props) {
	return (
		<div className="book-card">
			<BookCardHeader coverImg={props.coverImg} />
			<BookCardBody
				title={props.title}
				publishDate={props.publishDate}
				quote={props.quote}
			/>
		</div>
	);
}
