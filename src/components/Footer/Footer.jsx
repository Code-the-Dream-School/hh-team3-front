import React from "react";
import "./Footer.css";

function Footer() {
	return (
		<footer>
			<p className="text-center m-5">
				This project was coded by{" "}
				<strong>CTD Practicum hh-team3</strong> and is open-sourced on
				<a
					className="open-sourced"
					href="https://github.com/Code-the-Dream-School/hh-team3-front"
					target="_blank"
					rel="noopener noreferrer"
					title="GitHub Frontend Repository"
				>
					<strong> GitHub (Frontend)</strong>
				</a>{" "}
				and
				<a
					className="open-sourced"
					href="https://github.com/Code-the-Dream-School/hh-team3-back"
					target="_blank"
					rel="noopener noreferrer"
					title="GitHub Backend Repository"
				>
					<strong> GitHub (Backend)</strong>
				</a>
				.
			</p>
		</footer>
	);
}

export default Footer;
