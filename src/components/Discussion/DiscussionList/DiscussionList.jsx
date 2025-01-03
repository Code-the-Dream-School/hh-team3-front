import React from "react";
import DiscussionCard from "./DiscussionCard";
import { Link } from "react-router-dom";

function DiscussionList({ filteredData }) {
	return (
		<div className="display">
			{filteredData.map((discussion) => (
				<Link
					to={`/discussions/${discussion.id}`}
					style={{ textDecoration: "none" }}
					key={discussion.id}
				>
					<DiscussionCard {...discussion}> </DiscussionCard>
				</Link>
			))}
		</div>
	);
}

export default DiscussionList;
