import React from "react";
import PropTypes from "prop-types"; 
import "./TeamMemberCard.css";

function TeamMemberCard({ photo, name, title, socialLinks, email }) {
	return (
		<div className="team-member-card">
			<img
				src={`../teamMembers/${photo}`}
				alt={`${name}'s avatar`}
				className="team-member-card-img"
			/>
			<div className="team-member-card-body">
				<h5
					className={`team-member-card-title ${
						name.length > 18 ? "long-name" : ""
					}`}
				>
					{name}
				</h5>
				<p className="team-member-card-subtitle">{title}</p>
			</div>
			<div className="team-member-card-footer">
				{socialLinks.linkedin && (
					<a
						href={socialLinks.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						title="LinkedIn Profile"
					>
						<i className="fa-brands fa-linkedin"></i>
					</a>
				)}
				{socialLinks.github && (
					<a
						href={socialLinks.github}
						target="_blank"
						rel="noopener noreferrer"
						title="GitHub Profile"
					>
						<i className="fa-brands fa-github"></i>
					</a>
				)}
				{email && (
					<a href={`mailto:${email}`} title="Send Email">
						<i className="fa-solid fa-envelope"></i>
					</a>
				)}
			</div>
		</div>
	);
}

TeamMemberCard.propTypes = {
	photo: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	socialLinks: PropTypes.shape({
		linkedin: PropTypes.string,
		github: PropTypes.string,
	}).isRequired,
	email: PropTypes.string,
};

export default TeamMemberCard;
