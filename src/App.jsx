import React, { useEffect, useState } from 'react';
import { getAllData } from './util/index';
import BookCardMain from '/src/components/BookCard/BookCardMain.jsx';
import booksData from '/src/data/booksData.js';

import BookDetailsMain from '/src/components/BookDetails/BookDetailsMain.jsx';

const URL = 'http://localhost:8000/api/v1/';

function App() {
	const [message, setMessage] = useState('');

	useEffect(() => {
		(async () => {
			const myData = await getAllData(URL);
			setMessage(myData.data);
		})();

		return () => {
			console.log('unmounting');
		};
	}, []);

	const cards = booksData.map((item) => {
		return <BookCardMain key={item.id} {...item} />;
	});

	const books = booksData.map((item) => {
		return <BookDetailsMain key={item.id} {...item} />;
	});

	return (
		<div className="container">
			<h1>{message}</h1>
			<section className="cards-list">{cards}</section>
			<section className="books-page">{books}</section>
		</div>
	);
}

export default App;
