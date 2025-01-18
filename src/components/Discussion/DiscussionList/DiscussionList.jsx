import React from "react";
import { useNavigate } from "react-router-dom";
import DiscussionCard from "./DiscussionCard";

function DiscussionList({ filteredData }) {
	const navigate = useNavigate();

	const handleScrollToTop = (e) => {
		e.preventDefault();
		navigate("/find-discussion");
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<>
			<div className="discussion-list">
				{filteredData && filteredData.length > 0 ? (
					filteredData.map((discussion) => (
						<DiscussionCard key={discussion.id} {...discussion} />
					))
				) : (
					<p>No discussions found.</p>
				)}
			</div>
			<div className="text-center">
				<a
					href="/find-book"
					className="text-shadow"
					rel="noopener noreferrer"
					onClick={handleScrollToTop}
				>
					<strong>
						<small>
							<i className="fa-solid fa-angles-up"></i>
						</small>
					</strong>
				</a>
			</div>
		</>
	);
}

export default DiscussionList;
