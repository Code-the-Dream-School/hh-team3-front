import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

function Home({booksData}) {

    const randomBook=booksData[Math.floor(Math.random() * booksData.length)];

  return (
    <div className="day-theme">
    <div className="book-of-the-month">
    <h3>Book of the Month</h3>
    <p>Quote: {randomBook.quote}</p>
    <div key={randomBook.id} className="card">
        <img src={`../images/${randomBook.coverImg}`} />
				<div className="card-content">
				    <p className="card-title">{randomBook.title}</p>
					<p className="card-author">
					By {randomBook.author} ({randomBook.publishDate})
				</p>
        </div>
      </div>
    </div>
    <div className="container mt-5">
      <div className="welcome-section">
        <h1 className="my-text">Welcome to BookTalk</h1>
        <p>Online library with social networking features where you can read your favorite books</p>
        <p> And discuss them with your new mates.</p>
      </div>
      <div className="mt-5">
        <Link className="btn btn-outline-light book-btn me-4 style=position: absolute; bottom: 50px;" to="/find-discussion">Find a discussion to Join</Link>
        <Link className="btn btn-outline-light book-btn" to="/discover-books">Discover new books</Link>
      </div>
    </div>
    </div>
  );
}


export default Home;
