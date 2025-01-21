import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import "./SearchList.css";

function Search({ onSearch }) {
	const handleChange = (event) => {
		const inputValue = event.target.value;
		if (!inputValue.trim()) {
			alert("Please type something");
			return;
		}
		onSearch(inputValue);
	};
	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<div className="container" style={{ marginTop: "80px" }}>
			<div className="row justify-content-center">
				<div className="col-lg-8 col-md-12 mt-4 mb-4">
					<div className="d-flex align-items-center">
						<input
							ref={inputRef}
							type="text"
							className="form-control placeholder-sm"
							placeholder="Search a book by title, authors, or category"
							onChange={handleChange}
						/>
						<button className="btn btn-secondary ms-3  d-md-inline-block ">
							Search
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

Search.propTypes = {
	onSearch: PropTypes.func.isRequired,
};

export default Search;
