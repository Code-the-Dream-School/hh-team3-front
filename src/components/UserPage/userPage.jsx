import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./UserPage.css";

const UserPage = () => {
	const { token, user, fetchUserProfile, logout } = useContext(AuthContext);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [photo, setPhoto] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate("/login");
		} else if (user) {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.role === "admin");

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
				fetchUserProfile();
				logout();
				navigate("./login");
			} else {
				alert("Failed to update profile.");
			}
		} catch (error) {
			alert("An error occurred while updating profile.");
		}
	};

	return (
		<div className="user-page">
			<div className="user-profile">
				<div className="photo-upload">
					<label htmlFor="photoInput">
						<img
							src={
								photo
									? URL.createObjectURL(photo)
									: "/default-avatar.png"
							}
							alt="User Avatar"
							className="user-photo"
						/>
					</label>
					<input
						type="file"
						id="photoInput"
						accept="image/*"
						style={{ display: "none" }}
						onChange={handlePhotoUpload}
					/>
					<button>Upload Photo</button>
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
					<button className="save-button" onClick={handleSave}>
						Save
					</button>
				</div>
			</div>
			<div className="user-discussions">
				<h3>Your Discussions</h3>
				<ul>
					<li>Discussion 1</li>
					<li>Discussion 2</li>
				</ul>
			</div>
			{isAdmin && (
				<div className="admin-actions">
					<button>Create Book</button>
					<button>Create Discussion</button>
				</div>
			)}
		</div>
	);
};

export default UserPage;
