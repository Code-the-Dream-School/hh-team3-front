import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BookTalksInput from '../BookTalks/BookTalksInput.jsx';

export default function BookTalksForm({ onBookTalk }) {
	const [bookTalk, setBookTalk] = useState('');

	function handleReviewChange(event) {
		let newBookTalk = event.target.value;
		setBookTalk(newBookTalk);
	}

	function handleBookTalk(event) {
		event.preventDefault();
		if (bookTalk.trim()) {
			onBookTalk({
				review: bookTalk.trim(),
				id: uuidv4(),
				likes: 0,
				isLiked: false,
			});
			setBookTalk('');
		}
	}

	return (
		<div>
			<form className="form" onSubmit={handleBookTalk}>
				<BookTalksInput
					value={bookTalk}
					onChange={handleReviewChange}
				/>
				<button
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
