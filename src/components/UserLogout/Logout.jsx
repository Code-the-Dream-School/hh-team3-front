import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Logout = () => {
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/home");
	};

	return (
		<div style={{ textAlign: "center", marginTop: "10px" }}>
			<div>
				<button onClick={handleLogout} style={{ marginRight: "10px" }}>
					Logout
				</button>
			</div>
		</div>
	);
};
export default Logout;
