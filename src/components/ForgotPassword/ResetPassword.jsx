import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import "../userSignup/Signup.css";

const ResetPassword = () => {
	const [searchParams] = useSearchParams();
	const [newPassword, setNewPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [success, setSuccess] = useState(false);

	const token = searchParams.get("token");

	const validatePassword = (password) => {
		const passwordRegex =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
		return passwordRegex.test(password);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setPasswordError("");

		if (!validatePassword(newPassword)) {
			setPasswordError(
				"Password must include at least one letter, one number, one special character, and be at least 6 characters long.",
			);
			return;
		}

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
			<div className="signup-wrapper">
				<div className="login-container">
					<p>Your password has been successfully reset!</p>
				</div>
			</div>
		);
	}

	return (
		<div className="signup-wrapper">
			<div className="signup-container">
				<form id="reset-password-form" onSubmit={handleSubmit}>
					<h2>Reset Password</h2>
					{error && <p className="error">{error}</p>}
					{passwordError && <p className="error">{passwordError}</p>}
					<div className="password-input-wrapper">
						<input
							type={showPassword ? "text" : "password"}
							className="input"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							placeholder="New Password"
							required
						/>
						<button
							type="button"
							className="password-toggle"
							onClick={() => {
								setShowPassword(!showPassword);
							}}
						>
							{showPassword ? "🙈" : "👁"}
						</button>
					</div>
					<button type="submit" className="button">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;
