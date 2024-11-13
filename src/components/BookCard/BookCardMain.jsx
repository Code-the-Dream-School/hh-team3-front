import React from 'react';
import BookCardBody from './BookCardBody.jsx';
import BookCardHeader from './BookCardHeader.jsx';
import styles from './BookCardMain.module.css';

export default function BookCardMain({
	coverImg,
	title,
	publishDate,
	quote,
  author
}) {
	return (
		<div className={styles.bookCard}>
			<BookCardHeader coverImg={coverImg} />
			<BookCardBody
				title={title}
				publishDate={publishDate}
				quote={quote}
        author={author}
			/>
		</div>
	);
}
