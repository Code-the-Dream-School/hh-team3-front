import React from "react";
import { useNavigate } from "react-router-dom";
import TeamMemberCard from "../components/TeamMembers/TeamMemberCard.jsx";
import teamMembersData from "../data/teamMembersData.js";
import "./AboutUs.css";

function AboutUs() {
	const navigate = useNavigate();

	const handleScrollToTop = (e) => {
		e.preventDefault();
		navigate("/about");
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const mentors = teamMembersData.filter(
		(member) => member.role === "mentor",
	);
	const developers = teamMembersData.filter(
		(member) => member.role === "developer",
	);

	return (
		<div className="container about-container">
			<h2 className="text-center meet-our-team">The Dream Team</h2>
			<p className="team-slogan text-center">
				Together, we create, innovate, and inspire. Meet the creative
				minds shaping the future!
			</p>
			<div className="row justify-content-center mentors-row">
				{mentors.map((mentor) => (
					<div
						className="col-lg-4 col-md-6 col-sm-10"
						key={mentor.id}
					>
						<TeamMemberCard {...mentor} />
					</div>
				))}
			</div>
			<div className="row justify-content-center developers-row mb-3">
				{developers.map((developer) => (
					<div
						className="col-lg-3 col-md-4 col-sm-6 col-10 mb-5"
						key={developer.id}
					>
						<TeamMemberCard {...developer} />
					</div>
				))}
			</div>
			<div className="text-center mt-4">
				<a
					href="/about"
					className="text-shadow"
					rel="noopener noreferrer"
					onClick={handleScrollToTop}
				>
					<strong>
						<small>
							<i className="fa-solid fa-angles-up"></i>
						</small>
					</strong>
				</a>
			</div>
		</div>
	);
}

export default AboutUs;
