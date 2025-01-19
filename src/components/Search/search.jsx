import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
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
				<div className="col-12 col-md-8">
					<div className="d-flex align-items-center">
						<input
							ref={inputRef}
							type="text"
							className="form-control me-2 placeholder-sm mt-5 mb-5"
							placeholder="Search a book by title, authors, or category"
							onChange={handleChange}
						/>
						<button className="btn btn-secondary d-block d-md-inline-block">
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
