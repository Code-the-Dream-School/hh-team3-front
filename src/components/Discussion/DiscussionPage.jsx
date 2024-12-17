import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage.js";
import "./DiscussionPage.css";

const userMap = {
	"60b4bca4f1c64f16d1c1c8e4": "Alice",
	"60c5a8e7d9a5a142a02344b3": "Bob",
};

const bookMap = {
	"60b4bca4f1c64f16d1c1c8e4": "The Great Gatsby",
	"60c5a8e7d9a5a142a02344b3": "To Kill a Mockingbird",
};

export default function DiscussionPage({
	title,
	book,
	content,
	date,
	participants = [],
	meetingLink,
	createdBy,
}) {
	const formattedDate = new Date(date).toLocaleString([], {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});

	const participantNames = participants.map(
		(participantId) => userMap[participantId] || participantId,
	);
	const createdByName = userMap[createdBy] || createdBy;

	const bookName = bookMap[book] || book;

	const [isJoined, setIsJoined] = useLocalStorage(
		"discussionJoinStatus",
		false,
	);

	const handleJoinToggle = () => {
		setIsJoined((prevStatus) => !prevStatus);
	};

	return (
		<div className="discussion-page">
			<div className="discussion-container">
				<img src={'/'} alt="Book cover" />
				<div className="discussion-details">
					<p className="discussion-title">
						<strong>Title:</strong> {title}
					</p>
					<p className="discussion-book">
						<strong>Book:</strong> {bookName}
					</p>
					<p className="discussion-content">
						<strong>Content:</strong> {content}
					</p>
					<p className="discussion-date">
						<strong>Date:</strong> {formattedDate}
					</p>
					<p className="discussion-participants">
						<strong>Participants:</strong>{" "}
						{participantNames.length > 0
							? participantNames.join(" ")
							: "No participants yet."}
					</p>
					<p className="discussion-created-by">
						<strong>Created By:</strong> {createdByName}
					</p>
					<div className="buttons-container">
						<button className="join-btn" onClick={handleJoinToggle}>
							{isJoined ? "Leave" : "Join"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
