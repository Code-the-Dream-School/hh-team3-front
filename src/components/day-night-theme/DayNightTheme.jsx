import { useState } from 'react';
import '../BookCard/BookCard.css';
import '../BookDetails/BookDetails.css';
import './DayNightTheme.css';

export default function DayNightTheme() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleTheme = () => {
		setIsDarkMode((prevMode) => !prevMode);
		document.body.classList.toggle('dark', !isDarkMode);
	};

	return (
		<div className="toggle">
			<p
				id="lightenText"
				className={`toggle-text ${
					isDarkMode ? 'unselected' : ''
				}`}
			>
				<i className="fa-regular fa-sun"></i>
			</p>
			<div
				id="toggleButton"
				className={`toggle-button ${
					isDarkMode ? 'toggled' : ''
				}`}
				onClick={toggleTheme}
			>
				<div className="inner-circle"></div>
			</div>
			<p
				id="darkenText"
				className={`toggle-text ${
					!isDarkMode ? 'unselected' : ''
				}`}
			>
				<i className="fa-solid fa-moon"></i>
			</p>
		</div>
	);
}
