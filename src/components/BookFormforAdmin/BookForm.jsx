import React, { useState } from "react";
import Form from "react-bootstrap/Form";
const BookForm = ({ onAddBook }) => {
	const [formData, setFormData] = useState({
		title: "",
		authors: "",
		description: "",
		publisher: "",
		publishedDate: "",
		categories: "",
		cover: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleAddBook = (event) => {
		event.preventDefault();

		if (formData.title) {
			const bookItem = {
				...formData,
				id: Date.now(),
			};
			onAddBook(bookItem);
			setFormData({
				title: "",
				authors: "",
				description: "",
				publisher: "",
				publishedDate: "",
				categories: "",
				cover: "",
			});
		}
	};

	return (
		<div className="discussion-container">
			<Form onSubmit={handleAddBook} className="discussion-form">
				<Form.Group className="form-group">
					<Form.Label htmlFor="title">Title</Form.Label>
					<Form.Control
						id="title"
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						placeholder="Book Title"
					/>
				</Form.Group>
				<Form.Group className="form-group">
					<Form.Label htmlFor="authors">Authors</Form.Label>
					<Form.Control
						id="authors"
						type="text"
						name="authors"
						value={formData.authors}
						onChange={handleChange}
						placeholder="Use comma in Between"
					/>
				</Form.Group>
				<Form.Group className="form-group">
					<Form.Label htmlFor="content">Description</Form.Label>
					<Form.Control
						id="content"
						as="textarea"
						name="description"
						rows={4}
						value={formData.description}
						onChange={handleChange}
						placeholder=" "
					/>
				</Form.Group>
				<Form.Group className="form-group">
					<Form.Label htmlFor="publisher">Publisher Name</Form.Label>
					<Form.Control
						id="publisher"
						type="text"
						name="publisher"
						value={formData.publisher}
						onChange={handleChange}
						placeholder="Use comma in Between"
					/>
				</Form.Group>
				<Form.Group className="form-group">
					<Form.Label htmlFor="date">Published Date</Form.Label>
					<Form.Control
						id="date"
						type="date"
						name="publishedDate"
						value={formData.publishedDate}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group className="form-group">
					<Form.Label htmlFor="category">Category</Form.Label>
					<Form.Select
						id="category"
						type="text"
						name="categories"
						value={formData.categories}
						onChange={handleChange}
					>
						<option value="" disabled>
							Select Category
						</option>
						<option value="fiction">Fiction</option>
						<option value="non-fiction">Non-fiction</option>
						<option value="mystery">Mystery</option>
						<option value="science">Science</option>
						<option value="Young-Adult-Fiction">
							Young Adult Fiction
						</option>
						<option value="Juvenile_Fiction">
							Juvenile Fiction
						</option>
						<option value="Biography&Autobiography">
							Biography & Autobiography
						</option>
						<option value="Other">Other</option>
					</Form.Select>
				</Form.Group>
				<Form.Group className="form-group">
					<Form.Label htmlFor="cover">Upload Cover</Form.Label>
					<Form.Control
						id="cover"
						type="file"
						name="cover"
						accept="image/jpeg, image/jpg"
						onChange={(e) => {
							const file = e.target.files[0];
							if (
								file &&
								!["image/jpeg", "image/jpg"].includes(file.type)
							) {
								alert("Only JPG or JPEG images are allowed!");
							} else {
								setFormData({ ...formData, cover: file });
							}
						}}
					/>
				</Form.Group>
				*
				<div className="buttons-container">
					<button className="create-discussions-btn">Save</button>
				</div>
			</Form>
		</div>
	);
};
export default BookForm;
