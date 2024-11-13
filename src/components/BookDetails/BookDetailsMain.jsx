import React from 'react';
import BookAuthor from '../BookDetails/BookAuthor.jsx';
import BookCover from '../BookDetails/BookCover.jsx';
import BookDescription from '../BookDetails/BookDescription.jsx';
import BookPublishDate from '../BookDetails/BookPublishDate.jsx';
import BookQuote from '../BookDetails/BookQuote.jsx';
import BookTitle from '../BookDetails/BookTitle.jsx';
import styles from './BookDetailsMain.module.css';

export default function BookDetailsMain({
	title,
	coverImg,
	description,
	publishDate,
	quote,
	author,
}) {
	return (
		<div className={styles.bookDetailsContainer}>
			<div className={styles.cover}>
				<BookCover coverImg={coverImg} />
			</div>
			<div className={styles.bookDetails}>
				<BookTitle title={title} />
				<div className={styles.authorAndPublishDate}>
					<BookAuthor author={author} />
					<BookPublishDate publishDate={publishDate} />
				</div>
				<BookDescription description={description} />

				<BookQuote quote={quote} />
			</div>
		</div>
	);
}
