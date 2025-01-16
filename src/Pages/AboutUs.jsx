import React from "react";
import { useNavigate } from "react-router-dom";
import TeamMemberCard from "../components/TeamMembers/TeamMemberCard.jsx";
import teamMembersData from "../data/teamMembersData.js";
import './AboutUs.css';

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

  const mentors = teamMembersData.filter((member) => member.role === "mentor");
  const developers = teamMembersData.filter((member) => member.role === "developer");

  return (
    <div className="container about-container">
      <h2 className="text-center meet-our-team">The Dream Team</h2>
      <p className="team-slogan text-center">
        Together, we create, innovate, and inspire. Meet the creative minds shaping the future!
      </p>
      <div className="row grid">
        {mentors.map((mentor) => (
          <div 
            className="col-lg-4 col-md-6 col-sm-12 mb-4 team-member" 
            key={mentor.id}
          >
            <TeamMemberCard {...mentor} />
          </div>
        ))}
        <div className="w-100"></div>
        {developers.map((developer) => (
          <div 
            className="col-lg-2 col-md-4 col-sm-6 col-12 mb-4 team-member" 
            key={developer.id}
          >
            <TeamMemberCard {...developer} />
          </div>
        ))}
      </div>
      <div className="text-center">
				<a
					href="/find-book"
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