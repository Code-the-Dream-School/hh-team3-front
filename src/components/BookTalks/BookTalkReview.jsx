import React from "react";
import "./BookTalks.css";

export default function BookTalkReview({ reviews, onLike, onRemove }) {
	return (
		<div className="feed">
			{reviews.map((review) => {
				const displayName = review.username || "Anonymous";

				let avatarSrc = "/userAvatars/default-avatar.jpg";
				if (review.photo) {
					if (review.photo.startsWith("http")) {
						avatarSrc = review.photo;
					} else {
						avatarSrc = `/userAvatars/${review.photo}`;
					}
				}

				return (
					<div key={review.id} className="review">
						<div className="review-inner">
							<img
								className="book-talk-user-avatar"
								src={avatarSrc}
								alt={`${displayName} avatar`}
							/>
							<div className="message">
								<strong>
									<p className="username">{displayName}</p>
								</strong>
								<div className="text">
									<p className="review-text">
										{review.review}
									</p>
								</div>
								<div className="review-details">
									{onLike && (
										<span
											className="review-detail like detail"
											onClick={() => onLike(review.id)}
										>
											<i
												className={`fa-solid fa-thumbs-up ${
													review.isLiked
														? "liked"
														: ""
												}`}
											></i>
											{review.likes > 0 && (
												<span className="like-amount">
													{review.likes}
												</span>
											)}
										</span>
									)}

									{onRemove && (
										<span
											className="remove detail"
											onClick={() => onRemove(review.id)}
										>
											<i className="fa-regular fa-trash-can"></i>
										</span>
									)}
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
