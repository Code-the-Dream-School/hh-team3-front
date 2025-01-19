import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import PropTypes from "prop-types";
import "./DiscussionCard.css";

function DiscussionCard({
	title,
	book,
	bookImg,
	content,
	date,
	participants = [],
	meetingLink,
	createdBy,
	createdById,
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
	const userId = user?.id || null;
	const navigate = useNavigate();

	const isDateInFuture = (discussionDate) => {
		const discussionDateTime = new Date(discussionDate).getTime();
		const currentTime = new Date().getTime();
		return discussionDateTime >= currentTime;
	};

	useEffect(() => {
		if (user) {
			const isUserJoined = participants.some((participant) => {
				return participant === userId;
			});
			setIsJoined(isUserJoined);
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
			window.location.reload();
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
	const handleUpdateDiscussion = () => {
		navigate("/update-discussion", {
			state: {
				existingDiscussion: { title, content, date, meetingLink, id },
			},
		});
	};

	if (loading)
		return (
			<h2>
				{/* {" "}
				<Loader />{" "} */}
			</h2>
		);

	if (isDeleted) return <p>This discussion has been deleted.</p>;

	return (
		<div className="discussion-page">
			<div className="discussion-container">
				<div>
					<img src={bookImg} alt={`Cover of ${book}`} />
				</div>
				<div className="discussion-details">
					<p className="discussion-title fst-italic">{title}</p>
					<p className="discussion-book">
						<strong className="fst-italic">Book:</strong> {book}{" "}
					</p>
					<p className="discussion-content">
						<strong className="fst-italic">Content:</strong>{" "}
						{content}
					</p>
					<p className="discussion-date">
						<strong className="fst-italic">Date:</strong>{" "}
						{new Date(date).toLocaleString()}{" "}
					</p>

					<p className="discussion-participants">
						<strong className="fst-italic">Participants:</strong>{" "}
						{participantsCount > 0
							? `${participantsCount} participant${
									participantsCount > 1 ? "s" : ""
							  }`
							: "No participants yet"}
					</p>
					<p className="discussion-created-by">
						<strong className="fst-italic">Created By:</strong>{" "}
						{createdBy || "Unknown Creator"}{" "}
					</p>
					<p className="discussion-meetingLink">
						<strong className="fst-italic">
							Join us using this link:
						</strong>{" "}
						<a
							href={meetingLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							{meetingLink}
						</a>
					</p>
					<div className="buttons-container">
						{isDateInFuture(date) && (
							<button
								className="join-btn "
								onClick={handleJoinToggle}
								disabled={!canJoin || loading}
							>
								{isJoined ? "Leave" : "Join"}
							</button>
						)}

						{createdById === userId && (
							<button
								className="delete-btn "
								onClick={handleDeleteDiscussion}
								disabled={loading}
							>
								Delete Discussion
							</button>
						)}
						{createdById === userId && (
							<button
								className="delete-btn "
								onClick={handleUpdateDiscussion}
								disabled={loading}
							>
								Update Discussion
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

DiscussionCard.propTypes = {
	title: PropTypes.string.isRequired,
	book: PropTypes.string.isRequired,
	bookImg: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	participants: PropTypes.array,
	meetingLink: PropTypes.string.isRequired,
	createdBy: PropTypes.string,
	createdById: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	canJoin: PropTypes.bool,
};

DiscussionCard.defaultProps = {
	participants: [],
	createdBy: "Unknown Creator",
	canJoin: true,
};

export default DiscussionCard;
