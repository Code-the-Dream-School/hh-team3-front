import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./DiscussionForm.css";

function DiscussionForm({ onSubmit }) {
	const [formData, setFormData] = useState({
		title: "",
		book: "",
		content: "",
		date: "",
		participants: "",
		meetingLink: "",
		createdBy: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<div className="discussion-container">
			<Form onSubmit={handleSubmit} className="discussion-form">
				<Form.Group className="form-group">
					<Form.Label htmlFor="title">Title</Form.Label>
					<Form.Control
						id="title"
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						placeholder="Discussion Title"
					/>
				</Form.Group>

				<Form.Group className="form-group">
					<Form.Label htmlFor="content">Discussion Topics</Form.Label>
					<Form.Control
						id="content"
						as="textarea"
						name="content"
						rows={4}
						value={formData.content}
						onChange={handleChange}
						placeholder="Discussion Topics"
					/>
				</Form.Group>

				<Form.Group className="form-group">
					<Form.Label htmlFor="date">Date</Form.Label>
					<Form.Control
						id="date"
						type="date"
						name="date"
						value={formData.date}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group className="form-group">
					<Form.Label htmlFor="meetingLink">
						Zoom Meeting Link
					</Form.Label>
					<Form.Control
						id="meetingLink"
						type="text"
						name="meetingLink"
						value={formData.meetingLink}
						onChange={handleChange}
						placeholder="Zoom Meeting Link"
					/>
				</Form.Group>
				<button className="create-discussions-btn">
					Create Discussion
				</button>
			</Form>
		</div>
	);
}

export default DiscussionForm;
