import React from "react";
import "./BookTalks.css";

export default function BookTalksInput({ value, onChange, username, photo }) {
	return (
		<div className="bookTalksContainer">
			<div className="user-input">
				<img
					className="book-talk-user-avatar"
					src={`../userAvatars/${photo}`}
					alt={`${username || "Anonymous"} avatar`}
				/>
				<h5 className="username">{username}</h5>
			</div>
			<textarea
				className="inputTextarea"
				id="input"
				value={value}
				onChange={onChange}
				placeholder="Your review starts here - make it shine!"
			></textarea>
		</div>
	);
}
