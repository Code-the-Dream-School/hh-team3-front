import React from "react";
import BookCard from "../BookCard/BookCard";
import "./search.css";

function SearchList({ filteredData }) {
  console.log("Filtered Data: ", filteredData);
  const filtered = filteredData.map((book) => (
    <BookCard key={book.id} {...book} />
  ));
  return <div className="display">{filtered}</div>;
}

export default SearchList;
