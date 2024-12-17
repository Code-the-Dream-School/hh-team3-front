import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token") || "");

	const login = (newToken) => {
		setToken(newToken);
		localStorage.setItem("token", newToken);
	};

	const logout = () => {
		setToken("");
		localStorage.removeItem("token");
	};

	return (
		<AuthContext.Provider value={{ token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
