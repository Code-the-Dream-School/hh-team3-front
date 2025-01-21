import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../components/Context/AuthProvider";
import DiscussionList from "../components/Discussion/DiscussionList/DiscussionList";
import SearchForm from "../components/Search/SearchForm";

function FindADiscussion({ discussionsData }) {
	const now = new Date();
	const location = useLocation();
	const { defaultDiscussionType = "all" } = location.state || {};

	const [filteredData, setFilteredData] = useState([]);
	const [sortOrder, setSortOrder] = useState("a-z");
	const { user } = useContext(AuthContext);
	const userId = user?.id || null;

	const sortData = (data, order) => {
		return [...data].sort((a, b) => {
			const titleA = (a.title || "").trim().toLowerCase();
			const titleB = (b.title || "").trim().toLowerCase();
			return order === "a-z"
				? titleA.localeCompare(titleB)
				: titleB.localeCompare(titleA);
		});
	};

	useEffect(() => {
		let initialFilteredData;

		if (defaultDiscussionType === "my") {
			initialFilteredData = discussionsData.filter(
				(discussion) => discussion.createdById === userId,
			);
		} else {
			initialFilteredData = discussionsData.filter(
				(discussion) => new Date(discussion.date) > now,
			);
		}

		const sortedData = sortData(initialFilteredData, sortOrder);
		setFilteredData(sortedData);
	}, [discussionsData, defaultDiscussionType, userId, sortOrder]);
	const handleSearch = (query) => {
		const lowercasedQuery = query.toLowerCase();
		const filtered = discussionsData.filter((discussion) => {
			const formattedDate = new Date(
				discussion.date,
			).toLocaleDateString();
			return (
				discussion.title
					.trim()
					.toLowerCase()
					.includes(lowercasedQuery) ||
				discussion.book
					.trim()
					.toLowerCase()
					.includes(lowercasedQuery) ||
				formattedDate.includes(lowercasedQuery)
			);
		});
		const sortedFiltered = sortData(filtered, sortOrder);
		setFilteredData(sortedFiltered);
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
		const sortedFiltered = sortData(filtered, sortOrder);
		setFilteredData(sortedFiltered);
	};

	const handleSort = (order) => {
		console.log("Sorting Order:", order);
		setSortOrder(order);
		const sorted = sortData(filteredData, order);
		setFilteredData(sorted);
	};
	const handleDiscussionTypeChange = (type) => {
		let filtered;
		if (!userId) {
			alert("Please log in to join / leave the discussion.");
			setFilteredData(discussionsData);
			return;
		}

		if (type === "my") {
			filtered = discussionsData.filter((discussion) => {
				return discussion.createdById === userId;
			});
		} else if (type === "joined") {
			filtered = discussionsData.filter((discussion) =>
				discussion.participants.includes(userId),
			);
		} else {
			filtered = discussionsData;
		}
		const sortedFiltered = sortData(filtered, sortOrder);
		setFilteredData(sortedFiltered);
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

FindADiscussion.propTypes = {
	discussionsData: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			book: PropTypes.string.isRequired,
			date: PropTypes.string.isRequired,
			createdById: PropTypes.string.isRequired,
			participants: PropTypes.arrayOf(PropTypes.string).isRequired,
		}),
	).isRequired,
};

export default FindADiscussion;
