import React from "react";
import "./BookDetails.css";

export default function BookDetails({
  coverImg,
  authors = [],
  title,
  publishDate,
  description,
  categories = [],

}) {
  return (
    <div className="book-details-container day-theme">
      <img src={`../images/${coverImg}`} alt="book cover" />
      <div className="book-details">
        <p className="book-title">{title}</p>

        <p className="book-author">
          By {authors.join(", ")} {publishDate}
        </p>
        <p className="book-genre">
          {categories.map((category, index) => (
            <span key={index}>{category}</span>
          ))}
        </p>
        <p className="book-description">{description}</p>
        <div className="buttons-container">
          <button className="create-discussions-btn">Create Discussion</button>
        </div>
      </div>
    </div>
  );
}

