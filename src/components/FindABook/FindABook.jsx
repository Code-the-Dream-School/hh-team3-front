import '../BookCard/BookCard.css';
import BookCard from '/src/components/BookCard/BookCard.jsx';
import booksData from '/src/data/booksData.js';


export default function FindABook({
	
}) {
  const cards = booksData.map((item) => {
		return <BookCard key={item.id} {...item} />;
	});
	return (
		<div>
		<section>{cards}</section>
		</div>
	);
}