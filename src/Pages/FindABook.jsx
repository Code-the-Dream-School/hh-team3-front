import React, { useState } from "react";
import booksData from "../data/booksData";
import Search from "../components/Search/search";
import SearchList from "../components/Search/searchList";

function FindABook() {
 

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = booksData.filter(
      (book) =>
        book.title.toLowerCase().includes(lowercasedQuery) ||
        book.authors.some((author) =>
          author.toLowerCase().includes(lowercasedQuery),
        ) ||
        book.categories.some((category) =>
          category.toLowerCase().includes(lowercasedQuery),
        ),
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      <SearchList filteredData={filteredData} />
    </>
  );
}

export default FindABook;
