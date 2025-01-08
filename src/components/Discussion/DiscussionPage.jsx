import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage.js";
import Loader from "../Loader/Loader.jsx";
import "./DiscussionPage.css";

const userMap = {
	"60b4bca4f1c64f16d1c1c8e4": "Alice",
	"60c5a8e7d9a5a142a02344b3": "Bob",
};

const bookMap = {
	"60b4bca4f1c64f16d1c1c8e4": "The Great Gatsby",
	"60c5a8e7d9a5a142a02344b3": "To Kill a Mockingbird",
};

const bookImages = {
	"60b4bca4f1c64f16d1c1c8e4": "/images/gatsby.jpg",
	"60c5a8e7d9a5a142a02344b3": "/images/mockingbird.jpg",
};

export default function DiscussionPage({
	title,
	book,
	content,
	date,
	participants = [],
	meetingLink,
	createdBy,
	id,
}) {
	const [isJoined, setIsJoined] = useLocalStorage(
		`discussion_joined_${id}`,
		false,
	);
	const [isDeleted, setIsDeleted] = useLocalStorage(
		`discussion_deleted_${id}`,
		false,
	);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const formattedDate = new Date(date).toLocaleString([], {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});


	const createdByName = userMap[createdBy] || createdBy;

	const bookName = bookMap[book] || book;

	const canJoin = participants.length < 10;

	const handleJoinToggle = async () => {
		const token = localStorage.getItem("token");
		console.log("!!! " + token);
		if (!token) {
			throw new Error(
				"Failed to add a discussion. Please log in to continue.",
			);
		}

		if (participants.length >= 10) {
			alert(
				"This discussion is full. You can create your own or join a different one",
			);
			return;
		}
		setLoading(true);
		setError("");
		try {
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

			if (!response.ok) {
				throw new Error(
					`Failed to update join status: ${response.statusText}`,
				);
			}

			setIsJoined((prevState) => !prevState);
			setError("");
		} catch (error) {
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

	const bookImg = bookImages[book] || "/images/default-book.png";

	return (
		<div className="discussion-page">
			<div className="discussion-container">
				<img src={bookImg} alt={`Cover of ${bookName}`} />
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
						{participants.length > 0
							? `${participants.length} participant${
									participants.length > 1 ? "s" : ""
							  }`
							: "No participants yet."}
					</p>

					<p className="discussion-created-by">
						<strong>Created By:</strong> {createdByName}
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
		</div>
	);
}
