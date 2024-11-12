import React from 'react';

import './BookCardBody.css';

export default function BookCardBody(props) {
	return (
		<div className="card-body">
			<p className="card-title">
				Book title: {props.title}
			</p>
			<p className="card-publish-date">
				Publish date: {props.publishDate}
			</p>
			<p className="card-quote">Quote: {props.quote}</p>
		</div>
	);
}
