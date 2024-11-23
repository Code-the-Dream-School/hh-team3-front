import React from "react";
import "./BookCard.css";

{
  /*export default function BookCard({ booksData }) {
  return (
    <div className="day-theme">
      {booksData.map((item) => (
        <div key={item.id} className="card">
          <img src={`../images/${item.coverImg}`} />
          <div className="card-content">
            <p className="card-title">{item.title}</p>
            <p className="card-author">
              By {item.authors} ({item.publishDate})
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}*/
}

export default function BookCard({
  imageLinks = {},
  authors = [],
  title,
  publishedDate,
}) {
  return (
    <div className="card day-theme">
      <img src={`../images/${imageLinks.thumbnail}`} alt="Book cover" />
      <div className="card-content">
        <p className="card-title"> {title}</p>
        <p className="card-author">
          By {authors.join(",")} ({publishedDate})
        </p>
      </div>
    </div>
  );
}
