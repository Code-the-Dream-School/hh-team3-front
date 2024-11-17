import React from 'react';

import styles from './BookCardHeader.module.css';

export default function BookCardHeader({ coverImg }) {
	return (
		<header>
			<img
				src={`../images/${coverImg}`}
				className={styles.bookCardCover}
			/>
		</header>
	);
}
