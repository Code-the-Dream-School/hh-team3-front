import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookTalks from "../BookTalks/BookTalks.jsx";
import Loader from "../Loader/Loader.jsx";
import "./BookDetails.css";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateDiscussion = () => {
    if (!book || !book._id) {
      alert("Book ID is missing!");
      return;
    }
    navigate("/create-discussion", { state: { bookId: book._id } });
  };

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        const url = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${url}/books/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book details.");
        }
        const data = await response.json();
        setBook(data.book);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBookDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <h2>Error: {error}</h2>;
  if (!book) return <h2>Book not found.</h2>;

  return (
    <div className="book-details-page">
      <div className="book-details-container">
        <img src={book.imageLinks?.thumbnail} alt={book.title} />
        <div className="book-details">
          <p className="book-title">{book.title}</p>
          <p className="book-author">
            By {book.authors?.join(", ")} (
            {book.publishedDate?.split("-")[0]})
          </p>
          <p className="book-genre">
            {book.categories?.map((cat, idx) => (
              <span key={idx}>{cat}</span>
            ))}
          </p>
          <p className="book-description">{book.description}</p>
          <p className="book-publisher">Published by: {book.publisher}</p>
          <div className="buttons-container">
            <button onClick={handleCreateDiscussion} className="create-discussions-btn">
              Create Discussion
            </button>
          </div>
        </div>
      </div>
      <BookTalks bookId={book._id} />
    </div>
  );
}