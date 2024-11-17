import React from 'react';
import BookCard from '/src/components/BookCard/BookCard.jsx';
import BookDetails from '/src/components/BookDetails/BookDetails.jsx';
import booksData from '/src/data/booksData.js';

const URL = 'http://localhost:8000/api/v1/';

function App() {
	const cards = booksData.map((item) => {
		return <BookCard key={item.id} {...item} />;
	});

	const books = booksData.map((item) => {
		return <BookDetails key={item.id} {...item} />;
	});

	return (
		<div className="container">
			<section className="cards-list">{cards}</section>
			<section className="books-page">{books}</section>
		</div>
	);
}

export default App;
