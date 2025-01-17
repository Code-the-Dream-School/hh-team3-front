import React, { useEffect, useState } from "react";
import Search from "../components/Search/Search.jsx";
import SearchList from "../components/Search/searchList.jsx";

function FindABook({ booksData }) {
	const [filteredData, setFilteredData] = useState(booksData);

	useEffect(() => {
		setFilteredData(booksData);
	}, [booksData]);

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
