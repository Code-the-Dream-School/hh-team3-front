import { useState, useEffect } from "react";
import userData from "../../data/bookTalksData.js";
import BookTalkReview from "../BookTalks/BookTalkReview.jsx";
import BookTalkForm from "../BookTalks/BookTalksForm.jsx";
import "./BookTalks.css";

export default function BookTalks({ bookId }) {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const url = import.meta.env.VITE_API_BASE_URL;

	const fetchReviews = async () => {
		try {
			const response = await fetch(`${url}/comments?itemId=${bookId}`, {
				method: "GET",
			});

			if (!response.ok) {
				throw new Error(
					`Request failed with status ${response.status}`,
				);
			}
			const data = await response.json();
			const commentsSummary = data.comments.map((comment) => ({
				user: comment.user,
				itemId: comment.book,
				review: comment.text,
				reviewId: comment.id,
				likes: comment.likeCount,
				likeCount: comment.likeCount,
			}));

			setReviews(commentsSummary);

		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchReviews();
	}, [bookId]);

	const handleNewBookTalk = (newReview) => {
		setReviews((prevReviews) => [newReview, ...prevReviews]);
	};

	const handleLikeClick = (reviewId) => {
		setReviews((prevReviews) =>
			prevReviews.map((review) =>
				review.id === reviewId
					? {
							...review,
							isLiked: !review.isLiked,
							likes: review.isLiked
								? review.likes - 1
								: review.likes + 1,
					  }
					: review,
			),
		);
	};

	const handleRemoveClick = async (reviewId) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				navigate("/login");
				return null;
			}

			const response = await fetch(`${url}/comments/${reviewId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error(
					`Failed to delete comment with status ${response.status}`,
				);
			}

			setReviews((prevReviews) =>
				prevReviews.filter((review) => review.reviewId !== reviewId),
			);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="book-talks">
			<h1>BookTalk Reviews</h1>
			<BookTalkForm onBookTalk={handleNewBookTalk} bookId={bookId} />
			<BookTalkReview
				reviews={reviews}
				onLike={handleLikeClick}
				onRemove={handleRemoveClick}
				username={userData[0].username}
				photo={userData[0].photo}
			/>
		</div>
	);
}
