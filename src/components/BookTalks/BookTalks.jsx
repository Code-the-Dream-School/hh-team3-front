import { useState } from 'react';
import BookTalkReview from '../BookTalks/BookTalkReview.jsx';
import BookTalkForm from '../BookTalks/BookTalksForm.jsx';
import './BookTalks.css';

export default function BookTalks() {
	const [reviews, setReviews] = useState([]);

	const handleNewBookTalk = (newReview) => {
		setReviews((prevReviews) => [
			newReview,
			...prevReviews,
		]);
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
					: review
			)
		);
	};

	return (
		<div>
			<h1>BookTalk Reviews</h1>
			<BookTalkForm onBookTalk={handleNewBookTalk} />
			<BookTalkReview
				reviews={reviews}
				onLike={handleLikeClick}
			/>
		</div>
	);
}
