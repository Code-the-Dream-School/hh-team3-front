import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import PropTypes from "prop-types";
import BookTalksInput from "./BookTalksInput";
import "./BookTalks.css";
function BookTalksForm({ onBookTalk }) {
	const [bookTalk, setBookTalk] = useState("");
	const { user, isAuthenticated } = useContext(AuthContext);
	const navigate = useNavigate();

	function handleChange(e) {
		setBookTalk(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();

		if (!isAuthenticated) {
			alert("Please log in to post a comment!");
			navigate("/login");
			return;
		}

		if (!bookTalk.trim()) {
			alert("Please type something!");
			return;
		}

		const newComment = {
			review: bookTalk.trim(),
			userId: user?._id || "",
			username: user?.name || "Anonymous",
			photo: user?.photo || "",
		};

		onBookTalk(newComment);
		setBookTalk("");
	}

	return (
		<form className="bookTalksForm" onSubmit={handleSubmit}>
			<BookTalksInput value={bookTalk} onChange={handleChange} />
		</form>
	);
}

BookTalksForm.propTypes = {
	onBookTalk: PropTypes.func.isRequired,
};

export default BookTalksForm;
