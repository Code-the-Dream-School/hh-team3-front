import React from 'react';
import BookAuthor from '../BookDetails/BookAuthor.jsx';
import BookCover from '../BookDetails/BookCover.jsx';
import BookDescription from '../BookDetails/BookDescription.jsx';
import BookPublishDate from '../BookDetails/BookPublishDate.jsx';
import BookQuote from '../BookDetails/BookQuote.jsx';
import BookTitle from '../BookDetails/BookTitle.jsx';

export default function BookDetailsMain({
	title,
	coverImg,
	description,
	publishDate,
	quote,
	author,
}) {
	return (
		<>
			<BookAuthor author={author} />
			<BookCover coverImg={coverImg} />
			<BookDescription description={description} />
			<BookPublishDate publishDate={publishDate} />
			<BookQuote quote={quote} />
			<BookTitle title={title} />
		</>
	);
}
