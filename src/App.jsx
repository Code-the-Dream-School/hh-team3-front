import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Navbar from './components/NavBar/Navbar'
import Home from './Pages/home'
import booksData from '/src/data/booksData.js';
import BookCard from '/src/components/BookCard/BookCard.jsx';


const URL = 'http://localhost:8000/api/v1/';

function App() {
  
  return (
    <>
    <BrowserRouter>
       <Navbar />
       <Routes>
        <Route path="/" element={<Home />} />
		<Route path="/find-book" element={<BookCard booksData={booksData}/>}/>
        </Routes>
    </BrowserRouter>
      
    </>
  );

}

export default App