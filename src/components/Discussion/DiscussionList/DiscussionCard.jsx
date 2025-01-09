import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
export default function DiscussionCard({
	title,
	book,
	bookImg,
	content,
	date,
	participants = [],
	meetingLink,
	createdBy,
	id,
	canJoin = true,
}) {
	const { token, user } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [isDeleted, setIsDeleted] = useState(false);
	const [isJoined, setIsJoined] = useState(false);
	const [participantsCount, setParticipantsCount] = useState(
		participants.length,
	);

	useEffect(() => {
		if (user) {
			const isUserJoined = participants.some((participant) => {
				return participant === user.id;
			});
			setIsJoined(isUserJoined);
			console.log("@@@" + isUserJoined);
		}
	}, [participants, user]);

	const handleJoinToggle = async () => {
		if (!token) {
			alert("Please log in to join / leave the discussion.");
			return;
		}

		if (participantsCount >= 10) {
			alert(
				"This discussion is full. You can create your own or join a different one",
			);
			return;
		}

		setLoading(true);
		setError("");
		console.log("!!!" + isJoined);
		try {
			const endpoint = isJoined
				? `/discussions/${id}/unjoin`
				: `/discussions/${id}/join`;

			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				},
			);

			if (!response.ok) throw new Error("Failed to update join status");

			setParticipantsCount((prevCount) =>
				isJoined ? prevCount - 1 : prevCount + 1,
			);

			setIsJoined(!isJoined);
			setError("");
		} catch (err) {
			setError("Failed to update.");
		}
		setLoading(false);
	};

	const handleDeleteDiscussion = async () => {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error(
				"Failed to delete a discussion. Please log in to continue.",
			);
		}
		setLoading(true);
		setError("");
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/discussions/${id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				},
			);

			if (!response.ok) throw new Error("Failed to delete discussion");

			setIsDeleted(true);

			alert("Discussion has been successfully deleted.");

			window.location.reload();
		} catch (err) {
			setError("Failed to delete.");
		}
		setLoading(false);
	};

	if (loading)
		return (
			<h2>
				{" "}
				<Loader />{" "}
			</h2>
		);

	if (isDeleted) return <p>This discussion has been deleted.</p>;

	return (
		<div className="discussion-container">
			<div className="discussion-details">
				<img
					src={bookImg}
					alt={`Cover of ${book}`}
					width="200"
					height="300"
				/>
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
					<strong>Participants:</strong>{" "}
					{participantsCount > 0
						? `${participantsCount} participant${
								participantsCount > 1 ? "s" : ""
						  }`
						: "No participants yet"}
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
