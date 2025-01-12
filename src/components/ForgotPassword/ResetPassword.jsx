import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
	const [searchParams] = useSearchParams();
	const [newPassword, setNewPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const token = searchParams.get("token");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/auth/reset`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ token, newPassword }),
				},
			);

			if (response.ok) {
				setSuccess(true);
			} else {
				const errorData = await response.json();
				setError(
					errorData.message ||
						"Failed to reset password. Please try again.",
				);
			}
		} catch (err) {
			setError("Something went wrong. Please try again.");
		}
	};

	if (success) {
		return (
			<div id="reset-password-container">
				<p>Your password has been successfully reset!</p>
			</div>
		);
	}

	return (
		<div id="reset-password-container">
			<form id="reset-password-form" onSubmit={handleSubmit}>
				<h2>Reset Password</h2>
				{error && <p className="error">{error}</p>}
				<input
					type="password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					placeholder="New Password"
					required
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default ResetPassword;
