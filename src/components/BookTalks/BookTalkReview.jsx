import React from 'react';
import './BookTalks.css';

export default function BookTalkReview({
	reviews,
	onLike,
}) {
	return (
		<div className="feed">
			{reviews.map((review) => (
				<div key={review.id} className="review">
					<div className="review-inner">
						<img
							className="book-talk-user-avatar"
							src={'../userAvatars/default-avatar.jpg'}
							alt="user portrait"
						/>
						<div className="message">
						<strong><h5 class="username">User Name</h5></strong>
							<div className="text">
								<p className="review-text">
									{review.review}
								</p>
							</div>
							<div className="review-details">
								<span
									className="review-detail like detail"
									onClick={() => onLike(review.id)}
								>
									<i
										className={`fa-solid fa-thumbs-up ${
											review.isLiked ? 'liked' : ''
										}`}
									></i>
									{review.likes}
								</span>

								<span className="remove detail">
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
