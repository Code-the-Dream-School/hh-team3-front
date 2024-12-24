import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import "./Login.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

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
				navigate("/");
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
