import React from 'react';

import './BookCardHeader.css';

export default function BookCardHeader(props) {
	return (
		<header>
			<img
				src={`../images/${props.coverImg}`}
				className="card-image"
			/>
		</header>
	);
}
