export default function DiscussionCard({
	title,
	book,
	content,
	date,
	participants = [],
	meetingLink,
	createdBy,
}) {
	return (
		<div className="discussion-container">
			<div className="discussion-details">
				<p className="discussion-title">
					<strong>Title:</strong> {title}
				</p>
				<p className="discussion-book">
					<strong>Book:</strong> {book}{" "}
				</p>
				<p className="discussion-content">
					<strong>Content:</strong> {content}
				</p>
				<p className="discussion-date">
					<strong>Date:</strong> {new Date(date).toLocaleDateString()}{" "}
				</p>
				<p className="discussion-participants">
					<strong>Participants:</strong>
					{participants && participants.length > 0
						? participants.join(", ")
						: "No participants yet"}{" "}
				</p>
				<p className="discussion-created-by">
					<strong>Created By:</strong>{" "}
					{createdBy || "Unknown Creator"}{" "}
				</p>
				<p className="discussion-meetingLink">
					<strong>Join us using this link:</strong>{" "}
					<a
						href={meetingLink}
						target="_blank"
						rel="noopener noreferrer"
					>
						{meetingLink}
					</a>
				</p>
			</div>
		</div>
	);
}
