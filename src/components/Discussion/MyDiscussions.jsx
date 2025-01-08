import { useLocation } from "react-router-dom";

function MyDiscussions() {
	const location = useLocation();
	const discussions = location.state?.discussions || [];

	return (
		<div>
			<h2>My Discussions</h2>
			{discussions.length > 0 ? (
				<ul>
					{discussions.map((discussion) => (
						<li key={discussion.id}>
							<h3>{discussion.title}</h3>
							<p>{discussion.book}</p>
							<p>{discussion.content}</p>
						</li>
					))}
				</ul>
			) : (
				<p>No discussions found.</p>
			)}
		</div>
	);
}

export default MyDiscussions;
