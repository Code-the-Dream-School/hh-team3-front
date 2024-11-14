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
				<div className={styles.title}>
					<BookTitle title={title} />
				</div>

				<div className={styles.authorAndPublishDate}>
					<div className={styles.author}>
						<BookAuthor author={author} />
					</div>
					<div className={styles.publishDate}>
						<BookPublishDate publishDate={publishDate} />
					</div>
				</div>
				<div className={styles.description}>
					<BookDescription description={description} />
				</div>
				<div className={styles.quote}>
					<BookQuote quote={quote} />
				</div>
				<div >
					<button className={styles.createDiscussionButton}>Create discussion</button>
				</div>
			</div>
		</div>
	);
}
