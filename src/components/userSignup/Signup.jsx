import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { AuthContext } from "../Context/AuthProvider";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const validatePassword = (password) => {
		const passwordRegex =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
		return passwordRegex.test(password);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setEmailError("");

		if (!name || !email || !password) {
			setError("All fields are required.");
			return;
		}
		if (!validateEmail(email)) {
			setEmailError("Invalid email format.");
			return;
		}
		if (!validatePassword(password)) {
			setError(
				"Password must include at least one letter, one number, and one special character, and be at least 6 characters long.",
			);
			return;
		}

		setLoading(true);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/auth/register`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ name, email, password }),
				},
			);

			if (response.ok) {
				const data = await response.json();
				login(data.token);
				navigate("/");
			} else {
				const errorData = await response.json();
				setError(errorData.message || "An unexpected error occurred.");
			}
		} catch (err) {
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="signup-wrapper">
			<div className="signup-container">
				<form onSubmit={handleSubmit}>
					<h2>Signup</h2>
					{error && <p className="error">{error}</p>}

					<div>
						<label>Name:</label>
						<input
							className="input"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>

					<div>
						<label>Email:</label>
						<input
							className="input"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						{emailError && <p className="error">{emailError}</p>}
					</div>

					<div className="password-container">
						<label>Password:</label>
						<div className="password-input-wrapper  ">
							<input
								className="input"
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<button
								type="button"
								className="password-toggle  "
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? "👁️" : "👁️‍🗨️"}
							</button>
						</div>
					</div>

					<button className="button" type="submit" disabled={loading}>
						{loading ? "Signing up..." : "Signup"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Signup;
