import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import "./DiscussionForm.css";

function DiscussionForm({ onSubmit }) {
	const location = useLocation();
	const { bookId } = location.state || {};

	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const [formData, setFormData] = useState({
		title: "",
		content: "",
		date: "",
		meetingLink: "",
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

		if (!bookId) {
			alert(
				"Please navigate from a book details page to create a discussion.",
			);
			return;
		}

		if (!formData.title.trim()) {
			alert("Please provide a title for the discussion.");
			return;
		}
		if (!formData.content.trim()) {
			alert("Please provide discussion topics.");
			return;
		}
		if (!formData.date.trim()) {
			alert("Please select a date for the discussion.");
			return;
		}
		if (!formData.meetingLink.trim()) {
			alert("Please provide a valid meeting link.");
			return;
		}

		onSubmit({ ...formData, book: bookId });
	};

	return (
		<div className="discussion-container">
			<Form onSubmit={handleSubmit} className="discussion-form">
				<Form.Group className="form-group row">
					<Form.Label
						htmlFor="title"
						className="col-12 col-md-4 form-label"
					>
						Title
					</Form.Label>
					<div className="col-12 col-md-8">
						<Form.Control
							id="title"
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							placeholder="Discussion Title"
							className="form-control"
							ref={inputRef}
						/>
					</div>
				</Form.Group>
				<Form.Group className="form-group row">
					<Form.Label
						htmlFor="content"
						className="col-12 col-md-4 form-label"
					>
						Discussion Topics
					</Form.Label>
					<div className="col-12 col-md-8">
						<Form.Control
							id="content"
							as="textarea"
							name="content"
							rows={4}
							value={formData.content}
							onChange={handleChange}
							placeholder="Discussion Topics"
							className="form-control"
						/>
					</div>
				</Form.Group>
				<Form.Group className="form-group row">
					<Form.Label
						htmlFor="date"
						className="col-12 col-md-4 form-label"
					>
						Date
					</Form.Label>
					<div className="col-12 col-md-8">
						<Form.Control
							id="date"
							type="date"
							name="date"
							value={formData.date}
							onChange={handleChange}
							className="form-control"
						/>
					</div>
				</Form.Group>
				<Form.Group className="form-group row">
					<Form.Label
						htmlFor="meetingLink"
						className="col-12 col-md-4 form-label"
					>
						Meeting Link
					</Form.Label>
					<div className="col-12 col-md-8">
						<Form.Control
							id="meetingLink"
							type="text"
							name="meetingLink"
							value={formData.meetingLink}
							onChange={handleChange}
							placeholder="Zoom Meeting Link"
							className="form-control"
						/>
					</div>
				</Form.Group>
				<div className="buttons-container text-center">
					<button className="create-discussions-btn">
						Create Discussion
					</button>
				</div>
			</Form>
		</div>
	);
}

export default DiscussionForm;
