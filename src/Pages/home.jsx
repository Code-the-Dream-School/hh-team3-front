import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-4">
      
      <section className="welcome-section">
        <h1>Welcome to BookTalk</h1>
        <p>Online library with social networking features where you can read your favorite books and discuss them with your new mates.</p>
      </section>

      

    
      <section className="actions mt-4">
        <Link to="/find-discussion" className="btn">Find a discussion to Join</Link>
        <Link to="/discover-books" className="btn">Discover new books</Link>
      </section>
    </div>
  );
}

export default Home;
