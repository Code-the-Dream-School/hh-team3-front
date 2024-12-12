import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setEmailError("");
		if (!validateEmail(email)) {
			setEmailError("Invalid email format");
			return;
		}

		try {
			const response = await fetch(
				"http://localhost:8000/api/v1/auth/login",
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
				localStorage.setItem("token", data.token);
				navigate("/home");
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
					<h2>Login</h2>
					{error && <p className="error">{error}</p>}
					<div>
						<label>Email:</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						{emailError && <p className="error">{emailError}</p>}
					</div>
					<div className="password-container">
						<label>Password:</label>
						<div className="password-input-wrapper">
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<button
								type="button"
								className="password-toggle"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? "👁️" : "👁️‍🗨️"}
							</button>
						</div>
					</div>
					<button type="submit">Login</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
