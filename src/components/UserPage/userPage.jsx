import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import PropTypes from "prop-types"; 
import "./userPage.css";

const UserPage = ({ onUploadAvatar }) => {
	const { token, user, fetchUserProfile, logout } = useContext(AuthContext);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [photo, setPhoto] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const navigate = useNavigate();
	const [showSearchForm, setShowSearchForm] = useState(true);

	useEffect(() => {
		if (!token) {
			navigate("/login");
		} else if (user) {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.role === "admin");
			console.log(user.photo);

			const fetchProfile = async () => {
				try {
					const url = import.meta.env.VITE_API_BASE_URL;

					const response = await fetch(`${url}/auth/profile`, {
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					if (response.ok) {
						const profileData = await response.json();

						console.log(
							"Profile fetched successfully:",
							profileData,
						);
					} else {
						console.log(
							"Failed to fetch profile:",
							response.statusText,
						);
					}
				} catch (error) {
					console.log("Error fetching profile:", error);
				}
			};

			fetchProfile();
		}
	}, [token, user, navigate]);

	const handlePhotoUpload = (e) => {
		const file = e.target.files[0];
		setPhoto(file);
	};

	const handleSave = async () => {
		const formData = { name, email };

		try {
			const url = import.meta.env.VITE_API_BASE_URL;
			const response = await fetch(`${url}/auth/profile`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				alert("Profile updated successfully!");
			} else {
				console.error("Error updating profile:", error);
				alert("Failed to update profile.");
			}
		} catch (error) {
			alert("An error occurred while updating profile.");
		}
	};

	const handleCreateBook = () => {
		navigate("/create-book");
	};

	const handleAvatarUpload = async () => {
		if (photo) {
			try {
				const avatarData = await onUploadAvatar({
					avatar: photo,
					user: user,
				});
				console.log("Avatar uploaded successfully:", avatarData);
				alert("Avatar uploaded successfully!");
			} catch (error) {
				console.error("Error uploading avatar:", error);
				alert("Failed to upload avatar.");
			}
		} else {
			alert("Please select a photo to upload.");
		}
	};
	const handleMyDiscussionsClick = () => {
		setShowSearchForm(false);
		navigate("/find-discussion", {
			state: { defaultDiscussionType: "my" },
		});
	};

	return (
		<div className="user-container">
			<h1 className="mt-4 text-center form-title">Profile</h1>
			<div className="user-page">
				<div className="user-profile">
					<div className="photo-upload">
						<label htmlFor="photoInput">
							<img
								src={
									photo
										? URL.createObjectURL(photo)
										: user?.photo ||
										  "/userAvatars/default-avatar.jpg"
								}
								alt="User Avatar"
								className="user-photo"
								title="Click here to choose your photo"
							/>
						</label>
						<input
							type="file"
							id="photoInput"
							accept="image/*"
							style={{ display: "none" }}
							onChange={handlePhotoUpload}
						/>
						<button
							className="user-btn mt-3"
							title="Upload your photo"
							onClick={handleAvatarUpload}
						>
							Upload Photo
						</button>
					</div>
					<div className="user-details">
						<label>
							Name:
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</label>
						<label>
							Email:
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</label>
						<div className="buttons-container">
							<button
								className="user-btn"
								title="Save your information"
								onClick={handleSave}
							>
								Save
							</button>
						</div>
					</div>
				</div>

				<div className="buttons-container">
					{isAdmin && (
						<button
							className="user-btn"
							title="Create a new book"
							onClick={handleCreateBook}
						>
							Create Book
						</button>
					)}
					<button
						className="user-btn"
						title="My discussions"
						onClick={handleMyDiscussionsClick}
					>
						My Discussions
					</button>
				</div>
			</div>
		</div>
	);
};

UserPage.propTypes = {
	onUploadAvatar: PropTypes.func.isRequired,
};

export default UserPage;
