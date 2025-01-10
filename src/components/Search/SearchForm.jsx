import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useRef, useState } from "react";

function SearchForm({
	onSearch,
	onFilter,
	onSort,
	onDiscussionTypeChange,
	onClearFilters,
}) {
	//const inputRef = useRef();
	const [searchQuery, setSearchQuery] = useState("");
	const [timeFrame, setTimeFrame] = useState("all");
	const [sortOrder, setSortOrder] = useState("a-z");
	const [discussionType, setDiscussionType] = useState("all");

	// useEffect(() => {
	// 	inputRef.current.focus();
	// }, []);

	const handleSearchChange = (event) => {
		const value = event.target.value;
		setSearchQuery(value);
		onSearch(value);
	};

	const handleTimeFrameChange = (event) => {
		const value = event.target.value;
		setTimeFrame(value);
		onFilter(value);
	};

	const handleSortChange = (event) => {
		const value = event.target.value;
		setSortOrder(value);
		onSort(value);
	};
	const handleDiscussionTypeChange = (event) => {
		const value = event.target.value;
		setDiscussionType(value);
		onDiscussionTypeChange(value);
	};

	const handleClearFilters = () => {
		setSearchQuery("");
		setTimeFrame("all");
		setSortOrder("a-z");
		setDiscussionType("all");
		onClearFilters();
	};

	return (
		<div className="container py-4" style={{ marginTop: "80px" }}>
			<div className="row g-3 align-items-center">
				<div className="col-md-4">
					<label htmlFor="searchInput" className="form-label">
						Search
					</label>
					<input
						id="searchInput"
						type="text"
						className="form-control"
						placeholder="Search by title, book, or date"
						value={searchQuery}
						onChange={handleSearchChange}
					/>
				</div>

				<div className="col-md-4">
					<label htmlFor="timeFrameSelect" className="form-label">
						Status
					</label>
					<select
						id="timeFrameSelect"
						className="form-control"
						value={timeFrame}
						onChange={handleTimeFrameChange}
					>
						<option value="all">All</option>
						<option value="future">Future Discussions</option>
						<option value="past">Past Discussions</option>
					</select>
				</div>

				<div className="col-md-4">
					<label htmlFor="sortSelect" className="form-label">
						Sort
					</label>
					<select
						id="sortSelect"
						className="form-control"
						value={sortOrder}
						onChange={handleSortChange}
					>
						<option value="a-z">A-Z</option>
						<option value="z-a">Z-A</option>
					</select>
				</div>
				<div className="col-md-3">
					<label
						htmlFor="discussionTypeSelect"
						className="form-label"
					>
						Discussion Type
					</label>
					<select
						id="discussionTypeSelect"
						className="form-control"
						value={discussionType}
						onChange={handleDiscussionTypeChange}
					>
						<option value="all">All Discussions</option>
						<option value="my">My Discussions</option>
						<option value="joined">Joined Discussions</option>
					</select>
				</div>

				<div className="col-md-3 mt-5 d-flex justify-content-end">
					<button
						className="btn btn-secondary d-block d-md-inline-block"
						onClick={handleClearFilters}
					>
						Clear Filters
					</button>
				</div>
			</div>
		</div>
	);
}

export default SearchForm;
