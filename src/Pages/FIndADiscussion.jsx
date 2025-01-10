import React, { useState, useEffect, useContext } from "react";
import SearchForm from "../components/Search/SearchForm";
import DiscussionList from "../components/Discussion/DiscussionList/DiscussionList";
import { AuthContext } from "../components/Context/AuthProvider";

function FindADiscussion({ discussionsData }) {
	console.log(discussionsData);
	const [filteredData, setFilteredData] = useState(discussionsData || []);
	const [sortOrder, setSortOrder] = useState("a-z");
	const { user } = useContext(AuthContext);

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

	const handleFilter = (timeFrame) => {
		const now = new Date();
		let filtered;
		if (timeFrame === "future") {
			filtered = discussionsData.filter(
				(discussion) => new Date(discussion.date) > now,
			);
		} else if (timeFrame === "past") {
			filtered = discussionsData.filter(
				(discussion) => new Date(discussion.date) < now,
			);
		} else {
			filtered = discussionsData;
		}
		setFilteredData(filtered);
	};

	const handleSort = (order) => {
		const sorted = [...filteredData].sort((a, b) => {
			if (order === "a-z") {
				return a.title.localeCompare(b.title);
			} else {
				return b.title.localeCompare(a.title);
			}
		});
		setSortOrder(order);
		setFilteredData(sorted);
	};
	const handleDiscussionTypeChange = (type) => {
		console.log("User ID:", user.id);

		let filtered;

		if (type === "my") {
			filtered = discussionsData.filter((discussion) => {
				console.log(
					"Checking discussion.createdBy:",
					discussion.createdById,
				);
				return discussion.createdById === user.id;
			});
		} else if (type === "joined") {
			filtered = discussionsData.filter((discussion) =>
				discussion.participants.includes(user.id),
			);
		} else {
			filtered = discussionsData;
		}
		setFilteredData(filtered);
	};

	const handleClearFilters = () => {
		setFilteredData(discussionsData);
		setSortOrder("a-z");
	};

	return (
		<>
			<SearchForm
				onSearch={handleSearch}
				onFilter={handleFilter}
				onSort={handleSort}
				onDiscussionTypeChange={handleDiscussionTypeChange}
				onClearFilters={handleClearFilters}
			/>
			<DiscussionList filteredData={filteredData} />
		</>
	);
}

export default FindADiscussion;
