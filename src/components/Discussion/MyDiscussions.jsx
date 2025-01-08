import { useLocation } from "react-router-dom";

function MyDiscussions() {
	const location = useLocation();
	const discussions = location.state?.discussions || [];

	return (
		<div className="discussion-container">
			{discussions.length > 0 ? (
				<ul>
					{discussions.map((discussion) => (
						<div className="discussion-details">
							<p className="discussion-title">
								<strong>Title:</strong> {discussion.title}
							</p>
							<p className="discussion-book">
								<strong>Date:</strong>{" "}
								{new Date(discussion.date).toLocaleDateString()}
							</p>
						</div>
					))}
				</ul>
			) : (
				<p>No discussions found.</p>
			)}
		</div>
	);
}

export default MyDiscussions;
