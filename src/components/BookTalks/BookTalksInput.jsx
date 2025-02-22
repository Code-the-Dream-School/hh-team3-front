import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import PropTypes from "prop-types";
import "./BookTalks.css";

function BookTalksInput({ value, onChange }) {
	const { user } = useContext(AuthContext);

	let userPhoto = "/userAvatars/default-avatar.jpg";
	if (user?.photo) {
		if (user.photo.startsWith("http")) {
			userPhoto = user.photo;
		} else {
			userPhoto = `/userAvatars/${user.photo}`;
		}
	}

	const username = user?.name || "Anonymous";

	return (
		<div className="bookTalksContainer">
			<div className="user-input">
				<img
					className="book-talk-user-avatar"
					src={userPhoto}
					alt={`${username} avatar`}
				/>
			</div>
			<textarea
				className="inputTextarea"
				value={value}
				onChange={onChange}
				placeholder="Your review starts here..."
			/>

			<button className="post-book-talk-button" type="submit">
				Post
			</button>
		</div>
	);
}

BookTalksInput.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default BookTalksInput;
