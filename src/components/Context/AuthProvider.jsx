import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			fetchUserProfile();
		} else {
			setUser(null);
		}
	}, [token]);

	const fetchUserProfile = async () => {
		const url = import.meta.env.VITE_API_BASE_URL;
		const token = localStorage.getItem("token");
		if (!token) {
			console.error("No authentication token found.");
			return;
		}

		try {
			const response = await fetch(
				`${url}/auth/profile?_=${new Date().getTime()}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			if (response.ok) {
				const data = await response.json();
				setUser(data);
			} else {
				console.error(
					`Failed to fetch user profile. Status: ${response.status}`,
				);
			}
		} catch (error) {
			console.error("Failed to fetch user profile:", error.message);
		}
	};

	const login = (newToken) => {
		setToken(newToken);
		localStorage.setItem("token", newToken);
		fetchUserProfile();
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem("token");
		navigate("/login");
	};

	const isAuthenticated = !!token && !!user;

	return (
		<AuthContext.Provider
			value={{ token, user, login, logout, isAuthenticated }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
