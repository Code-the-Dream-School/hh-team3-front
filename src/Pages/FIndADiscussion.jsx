import React, { useState, useEffect } from "react";
import Search from "../components/Search/Search";
import DiscussionList from "../components/Discussion/DiscussionList/DiscussionList";

function FindADiscussion({ discussionsData }) {
	console.log(discussionsData);
	const [filteredData, setFilteredData] = useState(discussionsData || []);
	useEffect(() => {
		setFilteredData(discussionsData);
	}, [discussionsData]);

	const handleSearch = (query) => {
		const lowercasedQuery = query.toLowerCase();
		const filtered = discussionsData.filter((discussion) => {
			const formattedDate = new Date(
				discussion.date,
			).toLocaleDateString();
			return (
				discussion.title.toLowerCase().includes(lowercasedQuery) ||
				discussion.book.toLowerCase().includes(lowercasedQuery) ||
				formattedDate.includes(lowercasedQuery)
			);
		});
		setFilteredData(filtered);
	};

	return (
		<>
			<Search onSearch={handleSearch} />
			<DiscussionList filteredData={filteredData} />
		</>
	);
}

export default FindADiscussion;
