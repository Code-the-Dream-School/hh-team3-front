import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation } from "react-router-dom";
import "./DiscussionForm.css";

function UpdateDiscussion() {
	const navigate = useNavigate();
	const location = useLocation();
	const inputRef = useRef();

	const existingDiscussion = location.state?.existingDiscussion || null;

	const [formData, setFormData] = useState({
		title: existingDiscussion ? existingDiscussion.title : "",
		content: existingDiscussion ? existingDiscussion.content : "",
		date: existingDiscussion
			? new Date(existingDiscussion.date).toISOString().slice(0, 16)
			: "",
		meetingLink: existingDiscussion ? existingDiscussion.meetingLink : "",
	});
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

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

		const updatedDiscussion = { ...formData };
		const url = import.meta.env.VITE_API_BASE_URL;

		try {
			const response = await fetch(
				`${url}/discussions/${existingDiscussion.id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"token",
						)}`,
					},
					body: JSON.stringify(updatedDiscussion),
				},
			);

			if (!response.ok) {
				throw new Error("Failed to update discussion.");
			}

			alert("Discussion successfully updated!");
			setTimeout(() => {
				window.location.href = "/find-discussion";
			}, 500);
		} catch (error) {
			console.error("Error updating discussion:", error);
			alert("Failed to update discussion.");
		}
	};

	const handleClose = () => {
		navigate("/find-discussion");
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
						htmlFor="datetime"
						className="col-12 col-md-4 form-label"
					>
						Date and Time
					</Form.Label>
					<div className="col-12 col-md-8">
						<Form.Control
							id="datetime"
							type="datetime-local"
							name="date"
							value={formData.date}
							className="form-control"
							readOnly 
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
						Update Discussion
					</button>
					<button
						className="create-discussions-btn"
						type="button"
						onClick={handleClose}
					>
						Close
					</button>
				</div>
			</Form>
		</div>
	);
}

export default UpdateDiscussion;
