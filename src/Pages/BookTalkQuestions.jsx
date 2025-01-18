import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./BookTalkQuestions.css";

const BookTalkQuestions = () => {
	const [expandedSections, setExpandedSections] = useState({});

	const toggleSection = (section) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	return (
		<div className="container question-page">
			<div className="row">
				<div className="col-12 text-center mt-5">
					<h1>
						Preparing for Book Discussions: Asking the Right
						Questions
					</h1>
					<h4 className="mt-4 fst-italic">
						Welcome to your guide on crafting questions that make
						book discussions engaging and meaningful. Whether you're
						chatting with friends over tea or hosting a book club,
						well-thought-out questions can set the tone!
					</h4>
				</div>
			</div>

			<div className="row main-content">
				<div className="col-md-6 text-center img">
					<img
						src="../images/opened-book2.jpeg"
						alt="Book Discussion"
						className="img-fluid rounded"
					/>
				</div>
				<div className="col-md-6 questions">
					<h3 onClick={() => toggleSection("general")}>
						General Questions to Kick Off
					</h3>
					<div
						className={`content ${
							expandedSections.general ? "open" : ""
						}`}
					>
						<ul>
							<li>
								Would you recommend this book? Why or why not?
							</li>
							<li>
								What audience do you think this book is best
								suited for?
							</li>
							<li>
								What did you learn, or did your perspective
								change after reading?
							</li>
							<li>
								What emotions did this book evoke? Did you
								laugh, cry, or feel surprised?
							</li>
							<li>
								Do you have a favorite quote or scene? Why did
								it stand out to you?
							</li>
						</ul>
					</div>
					<h3 onClick={() => toggleSection("author")}>
						Questions About the Author
					</h3>
					<div
						className={`content ${
							expandedSections.author ? "open" : ""
						}`}
					>
						<ul>
							<li>
								What do you know about the author? How is it
								reflected in the book?
							</li>
							<li>
								What do you think inspired the author to write
								this book?
							</li>
							<li>
								If you could ask the author one question, what
								would it be?
							</li>
						</ul>
					</div>

					<h3 onClick={() => toggleSection("style")}>
						On Writing Style
					</h3>
					<div
						className={`content ${
							expandedSections.style ? "open" : ""
						}`}
					>
						<ul>
							<li>
								How did you find the writing style? Was it easy
								to read?
							</li>
							<li>
								What literary techniques stood out to you? Were
								they effective?
							</li>
							<li>
								How did the overall tone of the book shape your
								perception of the story?
							</li>
						</ul>
					</div>

					<h3 onClick={() => toggleSection("theme")}>
						Discussing Themes and Ideas
					</h3>
					<div
						className={`content ${
							expandedSections.theme ? "open" : ""
						}`}
					>
						<ul>
							<li>
								What key themes or ideas did you find
								significant?
							</li>
							<li>
								Did this book change your viewpoint on any
								topic?
							</li>
							<li>
								How relevant are the book's themes to the modern
								world?
							</li>
						</ul>
					</div>

					<h3 onClick={() => toggleSection("lovers")}>
						For Fiction Lovers
					</h3>
					<div
						className={`content ${
							expandedSections.lovers ? "open" : ""
						}`}
					>
						<ul>
							<li>
								Who is your favorite character and why? Who did
								you dislike?
							</li>
							<li>
								What challenge did the main character face? How
								did they change?
							</li>
							<li>
								How did you feel about the ending? Was it
								satisfying, or did you want more?
							</li>
						</ul>
					</div>
					<h3 onClick={() => toggleSection("enthusiasts")}>
						For Non-Fiction Enthusiasts
					</h3>
					<div
						className={`content ${
							expandedSections.enthusiasts ? "open" : ""
						}`}
					>
						<ul>
							<li>What was your main takeaway from this book?</li>
							<li>
								Did the book influence your behavior or way of
								thinking?
							</li>
							<li>
								What interesting facts or stories stood out the
								most?
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookTalkQuestions;
