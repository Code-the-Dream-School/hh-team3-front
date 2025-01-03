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
					<strong>Book:</strong> {book}
				</p>
				<p className="discussion-content">
					<strong>Content:</strong> {content}
				</p>
				<p className="discussion-date">
					<strong>Date:</strong> {date}
				</p>
				<p className="discussion-participants">
					<strong>Participants:</strong>
					{participants.join(",")}
				</p>
				<p className="discussion-created-by">
					<strong>Created By:</strong> {createdBy}
				</p>
				<p className="discussion-meetingLink">
					<strong>Join us using this link:</strong> {meetingLink}
				</p>
			</div>
		</div>
	);
}
