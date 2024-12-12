import userData from "../../data/bookTalksData.js";
import useLocalStorageReviews from "../../hooks/useLocalStorageReviews";
import BookTalkReview from "../BookTalks/BookTalkReview.jsx";
import BookTalkForm from "../BookTalks/BookTalksForm.jsx";
import "./BookTalks.css";

export default function BookTalks() {
	const [reviews, setReviews] = useLocalStorageReviews("bookTalkReviews", []);

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

	const handleRemoveClick = (reviewId) => {
		setReviews((prevReviews) =>
			prevReviews.filter((review) => review.id !== reviewId),
		);
	};

	return (
		<div className="book-talks">
			<h1>BookTalk Reviews</h1>
			<BookTalkForm onBookTalk={handleNewBookTalk} />
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
