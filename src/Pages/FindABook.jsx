import React from "react";
import booksData from "../data/booksData";
import BookCard from "../components/BookCard/BookCard";

function FindABook({}) {
  const cards = booksData.map((item) => {
    return <BookCard key={item.id} {...item} />;
  });
  return (
    <>
      <div className="day-theme">{cards}</div>
    </>
  );
}

export default FindABook;
