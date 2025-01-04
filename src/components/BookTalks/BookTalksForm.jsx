import { useState } from "react";
import userData from "../../data/bookTalksData.js";
import BookTalksInput from "../BookTalks/BookTalksInput.jsx";
import { useNavigate } from "react-router-dom";

export default function BookTalksForm({ onBookTalk, bookId }) {
	const [bookTalk, setBookTalk] = useState("");
	const navigate = useNavigate();

	function handleReviewChange(event) {
		let newBookTalk = event.target.value;
		setBookTalk(newBookTalk);
	}

	async function handleBookTalk(event) {
		event.preventDefault();
		if (bookTalk.trim()) {
			const reviewData = {
				review: bookTalk.trim(),
				userId: userData[0].id,
				username: userData[0].username,
				photo: userData[0].photo || "default-avatar.jpg",
			};

			const token = localStorage.getItem("token");
			if (!token) {
				navigate("/login");
				return null;
			}

			const url = import.meta.env.VITE_API_BASE_URL;

			try {
				const response = await fetch(`${url}/comments`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						text: reviewData.review,
						book: bookId,
					}),
				});

				if (!response.ok) {
					throw new Error(
						`Request failed with status ${response.status}`,
					);
				}

				const jsonResponse = await response.json();
				const comment = jsonResponse.comment;
				console.log(comment);
				const newReviewData = {
					reviewId: comment.id,
					review: comment.text || "",
					username: userData[0].username,
					photo: userData[0].photo || "default-avatar.jpg"
				};
				onBookTalk(newReviewData);
				setBookTalk("");
			} catch (error) {
				console.error("Error occurred:", error.message);
			}
		}
	}

	return (
		<div>
			<form className="form" onSubmit={handleBookTalk}>
				<BookTalksInput
					value={bookTalk}
					onChange={handleReviewChange}
					username={userData[0].username}
					photo={userData[0].photo}
				/>
				<button
					className="post-book-talk-button"
					type="submit"
					id="submit-book-talk-btn"
					title="Post BookTalk"
				>
					Post BookTalk
				</button>
			</form>
		</div>
	);
}
