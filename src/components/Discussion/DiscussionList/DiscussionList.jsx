import React from "react";
import DiscussionCard from "./DiscussionCard";

function DiscussionList({ filteredData }) {
	return (
		<div className="discussion-list">
			{filteredData && filteredData.length > 0 ? (
				filteredData.map((discussion) => (
					<DiscussionCard key={discussion.id} {...discussion} />
				))
			) : (
				<p>No discussions found.</p>
			)}
		</div>
	);
}

export default DiscussionList;
