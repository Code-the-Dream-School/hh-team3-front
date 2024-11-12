import React from 'react';

import './BookCardBody.css';

export default function BookCardBody({
	title,
	publishDate,
	quote,
}) {
	return (
		<div className="card-body">
			<p className="card-title">Book title: {title}</p>
			<p className="card-publish-date">
				Publish date: {publishDate}
			</p>
			<p className="card-quote">Quote: {quote}</p>
		</div>
	);
}
