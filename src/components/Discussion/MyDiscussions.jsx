import { useLocation } from "react-router-dom";

function MyDiscussions() {
	const location = useLocation();
	const discussions = location.state?.discussions || [];

	return (
		<div className="discussion-container">
			{discussions.length > 0 ? (
				<div className="discussion-details">
					{discussions.map((discussion) => (
						<div key={discussion.id}>
							<p className="discussion-title">
								<strong>Title:</strong> {discussion.title}
							</p>
							<p className="discussion-date">
								<strong>Date:</strong>{" "}
								{new Date(discussion.date).toLocaleDateString()}{" "}
							</p>
						</div>
					))}
				</div>
			) : (
				<p>No discussions found.</p>
			)}
		</div>
	);
}

export default MyDiscussions;
