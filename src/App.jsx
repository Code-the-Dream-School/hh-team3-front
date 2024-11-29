import {
	BrowserRouter,
	Route,
	Routes,
} from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import BookCard from '/src/components/BookCard/BookCard.jsx';
import BookDetails from '/src/components/BookDetails/BookDetails.jsx';
import booksData from '/src/data/booksData.js';
import FindABook from '/src/components/FindABook/FindABook.jsx'
const URL = 'http://localhost:8000/api/v1/';

function App() {
	

	const books = booksData.map((item) => {
		return <BookDetails key={item.id} {...item} />;
	});

	return (
		<>
			<BrowserRouter>
				<Navbar />
				
				<section>{books}</section>
				<Routes>
					<Route
						path="/find-book"
						element={<FindABook />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default App;
