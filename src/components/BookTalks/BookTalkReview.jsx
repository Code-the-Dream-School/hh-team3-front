import React from "react";
import "./BookTalks.css";

export default function BookTalkReview({
	reviews,
	onLike,
	onRemove,
	username,
	photo,
}) {
	return (
		<div className="feed">
			{reviews.map((review) => (
				<div key={review.reviewId} className="review">
					<div className="review-inner">
						<img
							className="book-talk-user-avatar"
							src={`../userAvatars/${photo}`}
							alt={`${review.username} avatar`}
						/>

						<div className="message">
							<strong>
								<p className="username">{username}</p>
							</strong>
							<div className="text">
								<p className="review-text">{review.review}</p>
							</div>
							<div className="review-details">
								<span
									className="review-detail like detail"
									onClick={() => onLike(review.reviewId)}
								>
									<i
										className={`fa-solid fa-thumbs-up ${
											review.isLiked ? "liked" : ""
										}`}
									></i>
									{review.likes > 0 && (
										<span className="like-amount">
											{review.likes}
										</span>
									)}
								</span>
								<span
									className="remove detail"
									onClick={() => onRemove(review.reviewId)}
								>
									<i className="fa-regular fa-trash-can"></i>
								</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
