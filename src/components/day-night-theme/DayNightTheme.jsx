import React from "react";
import { useColorScheme } from "../../hooks/useColorScheme";
import "./DayNightTheme.css";

export default function DayNightTheme() {
	const { isDark, toggleTheme } = useColorScheme();

	return (
		<div className="toggle">
			<p className={`toggle-text ${isDark ? "unselected" : ""}`}>
				<i className="fa-regular fa-sun"></i>
			</p>
			<div
				className={`toggle-button ${isDark ? "toggled" : ""}`}
				onClick={toggleTheme}
			>
				<div className="inner-circle"></div>
			</div>
			<p className={`toggle-text ${!isDark ? "unselected" : ""}`}>
				<i className="fa-solid fa-moon"></i>
			</p>
		</div>
	);
}
