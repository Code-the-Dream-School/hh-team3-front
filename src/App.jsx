import React from 'react';
// import { getAllData } from './util/index';
import BookCardMain from '/src/components/BookCard/BookCard.jsx';
import booksData from '/src/data/booksData.js';

import BookDetailsMain from '/src/components/BookDetails/BookDetailsMain.jsx';

const URL = 'http://localhost:8000/api/v1/';

function App() {
	const cards = booksData.map((item) => {
		return <BookCardMain key={item.id} {...item} />;
	});

	const books = booksData.map((item) => {
		return <BookDetailsMain key={item.id} {...item} />;
	});

	return (
		<div className="container">
			<section className="cards-list">{cards}</section>
			<section className="books-page">{books}</section>
		</div>
	);
}

export default App;
