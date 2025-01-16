import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import "./BookTalks.css";

export default function BookTalksInput({ value, onChange }) {
  const { user } = useContext(AuthContext);

  let userPhoto = "/userAvatars/default-avatar.jpg";
  if (user?.photo) {
    if (user.photo.startsWith("http")) {
      userPhoto = user.photo;
    } else {
      userPhoto = `/userAvatars/${user.photo}`;
    }
  }

  const username = user?.name || "Anonymous";

  return (
    <div className="bookTalksContainer">
      <div className="user-input">
        <img
          className="book-talk-user-avatar"
          src={userPhoto}
          alt={`${username} avatar`}
        />
      </div>

      <textarea
        className="inputTextarea"
        value={value}
        onChange={onChange}
        placeholder="Your review starts here..."
      />
    </div>
  );
}