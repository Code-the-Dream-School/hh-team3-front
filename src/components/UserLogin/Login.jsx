import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import "./Login.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isResetMode, setIsResetMode] = useState(false);
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (isResetMode) {
			// Request reset link
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_BASE_URL}/auth/request`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email }),
					},
				);

				if (response.ok) {
					alert("A reset password link has been sent to your email.");
					setIsResetMode(false);
				} else {
					const errorData = await response.json();
					setError(errorData.message || "Failed to send reset link.");
				}
			} catch (err) {
				setError("Something went wrong. Please try again.");
			}
			return;
		}

		// Login process
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/auth/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				},
			);

			if (response.ok) {
				const data = await response.json();
				login(data.token);
				navigate("/userPage");
			} else {
				const errorData = await response.json();
				setError(errorData.message || "Invalid email or password");
			}
		} catch (err) {
			setError("Something went wrong. Please try again.");
		}
	};

	return (
		<div className="login-wrapper">
			<div className="login-container">
				<form onSubmit={handleSubmit}>
					<h2 className="text-center mb-3">
						{isResetMode ? "Reset Password" : "Login"}
					</h2>
					{error && <p className="error">{error}</p>}
					<div>
						<label>Email:</label>
						<input
							ref={inputRef}
							className="input"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					{!isResetMode && (
						<div className="password-container">
							<label>Password:</label>
							<div className="password-input-wrapper">
								<input
									className="input"
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
								/>
								<button
									type="button"
									className="password-toggle button"
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? "👁️" : "👁️‍🗨️"}
								</button>
							</div>
						</div>
					)}
					<button className="button" type="submit">
						{isResetMode ? "Request Reset Link" : "Login"}
					</button>
					<p
						className="link-text"
						onClick={() => {
							setIsResetMode(!isResetMode);
							setError("");
						}}
					>
						{isResetMode ? "Back to Login" : "Forgot Password?"}
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
