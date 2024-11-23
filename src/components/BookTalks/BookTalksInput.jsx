import { useEffect, useRef } from 'react';
import './BookTalks.css'

export default function BookTalksInput({
	value,
	onChange,
}) {
	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<div className="bookTalksContainer">
      <img
							className="book-talk-user-avatar"
							src={'../userAvatars/default-avatar.jpg'}
						/>
						
			<textarea
				className="inputTextarea"
				id="input"
				ref={inputRef}
				value={value}
				onChange={onChange}
				placeholder="Your review starts here - make it shine!"
			></textarea>
      
		</div>
	);
}