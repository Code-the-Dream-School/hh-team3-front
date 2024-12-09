import React from "react";
import BookCard from "../BookCard/BookCard";
import "./search.css";

function SearchList({ filteredData }) {
  return <div className="display">{filteredData.map((book) => (
    <BookCard key={book.id} {...book} />
  ))}</div>;
}

export default SearchList;
