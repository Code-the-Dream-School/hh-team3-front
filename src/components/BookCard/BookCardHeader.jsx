import React from 'react';

import './BookCardHeader.css';

export default function BookCardHeader({ coverImg }) {
	return (
		<header>
			<img
				src={`../images/${coverImg}`}
				className="card-image"
			/>
		</header>
	);
}
