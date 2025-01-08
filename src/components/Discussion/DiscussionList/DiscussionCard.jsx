import React, { useState } from "react";
export default function DiscussionCard({
	title,
	book,
	content,
	date,
	participants = [],
	meetingLink,
	createdBy,
	id,
	canJoin = true, 
}) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [isDeleted, setIsDeleted] = useState(false);
	const [isJoined, setIsJoined] = useState(false);

	const handleJoinToggle = async () => {
		if (participants.length >= 10) {
			alert(
				"This discussion is full. You can create your own or join a different one",
			);
			return;
		}
		setLoading(true);
		setError("");
		try {
			const endpoint = isJoined
				? `/discussions/${id}/unjoin`
				: `/discussions/${id}/join`;

			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
				{
					method: "POST",
				},
			);

			if (!response.ok) throw new Error("Failed to update join status");

			setIsJoined(!isJoined);
			setError("");
		} catch (err) {
			setError("Failed to update.");
		}
		setLoading(false);
	};

	const handleDeleteDiscussion = async () => {
		setLoading(true);
		setError("");
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/discussions/${id}`,
				{
					method: "DELETE",
				},
			);

			if (!response.ok) throw new Error("Failed to delete discussion");

			setIsDeleted(true);
		} catch (err) {
			setError("Failed to delete.");
		}
		setLoading(false);
	};

	if (loading)
		return (
			<h2>
				<Loader />
			</h2>
		);

	if (isDeleted) return <p>This discussion has been deleted.</p>;

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
				<div className="buttons-container">
					<button
						className="join-btn button"
						onClick={handleJoinToggle}
						disabled={!canJoin || loading}
					>
						{isJoined ? "Leave" : "Join"}
					</button>
					<button
						className="delete-btn button"
						onClick={handleDeleteDiscussion}
						disabled={loading}
					>
						Delete Discussion
					</button>
				</div>
			</div>
		</div>
	);
}
