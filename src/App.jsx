import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Navbar from './components/NavBar/Navbar'
import Home from './Pages/home'

const URL = 'http://localhost:8000/api/v1/';

function App() {
  
  const [message, setMessage] = useState(''); 

  useEffect(() => {

    (async () => {
      const myData = await getAllData(URL)
      setMessage(myData.data);
    })();
      
    return () => {
      console.log('unmounting');
    }

  }, []);

  return (
    <>
    <BrowserRouter>
       <Navbar />
       <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
      
    </>
  );

}

export default App