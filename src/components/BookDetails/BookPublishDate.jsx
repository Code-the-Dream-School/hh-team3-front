import React from 'react';
export default function BookPublishDate({ publishDate }) {
	return (
		<div className="book-details">
			<p className="book-publish-date">
				Publish date: {publishDate}
			</p>
		</div>
	);
}
