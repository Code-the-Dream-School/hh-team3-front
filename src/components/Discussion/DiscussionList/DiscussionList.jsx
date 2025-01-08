import React from "react";
import DiscussionCard from "./DiscussionCard";
import { Link } from "react-router-dom";

function DiscussionList({ filteredData }) {
	return (
		<div className="discussion-list">
			{filteredData && filteredData.length > 0 ? (
				filteredData.map((discussion) => (
					<DiscussionCard
						key={discussion.id}
						id={discussion.id}
						title={discussion.title}
						book={discussion.book}
						content={discussion.content}
						date={discussion.date}
						participants={discussion.participants}
						meetingLink={discussion.meetingLink}
						createdBy={discussion.createdBy}
					/>
				))
			) : (
				<p>No discussions found.</p>
			)}
		</div>
	);
}

export default DiscussionList;
