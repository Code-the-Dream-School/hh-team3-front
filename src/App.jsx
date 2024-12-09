import {
	BrowserRouter,
	Route,
	Routes,
} from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar/Navbar';
import FindABook from './Pages/FindABook';
import Home from './Pages/home';
import booksData from '/src/data/booksData.js';
const URL = 'http://localhost:8000/api/v1/';

function App() {
	if (typeof global === 'undefined') {
		window.global = window;
	}
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route
						path="/find-book"
						element={<FindABook />}
					/>
					<Route
						path="/"
						element={<Home booksData={booksData} />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default App;
