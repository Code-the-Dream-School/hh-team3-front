import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Search from "../components/Search/search.jsx";
import SearchList from "../components/Search/searchList.jsx";
import PropTypes from "prop-types"; 

function FindABook({ booksData }) {
	const [filteredData, setFilteredData] = useState(booksData);
	const location = useLocation();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const category = queryParams.get("category");

		if (category) {
			handleSearch(category);
		} else {
			setFilteredData(booksData);
		}
	}, [location.search, booksData]);

	const handleSearch = (query) => {
		const lowercasedQuery = query.toLowerCase();
		const filtered = booksData.filter(
			(book) =>
				book.title.trim().toLowerCase().includes(lowercasedQuery) ||
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

FindABook.propTypes = {
	booksData: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			authors: PropTypes.arrayOf(PropTypes.string).isRequired,
			categories: PropTypes.arrayOf(PropTypes.string).isRequired,
			description: PropTypes.string,
			publishedDate: PropTypes.string,
			imageLinks: PropTypes.shape({
				thumbnail: PropTypes.string,
			}),
		}),
	).isRequired,
};

export default FindABook;
