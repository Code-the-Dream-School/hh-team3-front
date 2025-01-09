import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import BookTalkReview from "./BookTalkReview";
import BookTalksForm from "./BookTalksForm";
import "./BookTalks.css";

export default function BookTalks({ bookId }) {
  const { token, user, isAuthenticated } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  async function renderExistingComments() {
    if (!bookId) return;
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL; 
      console.log("[BookTalks] GET /comments?itemId=", bookId);

      const resp = await fetch(`${baseUrl}/comments?itemId=${bookId}`, {
        headers: {
        
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resp.ok) {
        throw new Error(`Failed to fetch comments. Status: ${resp.status}`);
      }

      const data = await resp.json();
      if (!data.comments) {
        throw new Error("No 'comments' array in response");
      }

      const normalized = data.comments.map((c) => ({
        id: c._id,
        review: c.text,
        username: c.user?.name || "Anonymous",
        photo: c.user?.photo || "",
        likes: c.likeCount || 0,
        isLiked: user && Array.isArray(c.likes) && c.likes.includes(user._id),
      }));

      setReviews(normalized);
      console.log("[BookTalks] final reviews =>", normalized);
    } catch (err) {
      console.error("[BookTalks] renderExistingComments error:", err);
    }
  }
  useEffect(() => {
    renderExistingComments();
  
  }, [bookId]);

  async function addNewComment(newReview) {
    if (!isAuthenticated) {
      alert("Please log in to add a comment!");
      navigate("/login");
      return;
    }

    const tempId = "temp-" + Math.random().toString(36).substring(2);
    setReviews((prev) => [
      { ...newReview, id: tempId },
      ...prev,
    ]);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      const body = {
        bookId,
        text: newReview.review,
      };

      console.log("[BookTalks] POST /comments =>", body);

      const resp = await fetch(`${baseUrl}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        throw new Error(`Failed to create comment. Status: ${resp.status}`);
      }

      const data = await resp.json();
      console.log("[BookTalks] Created comment =>", data.comment);

      await renderExistingComments();
    } catch (err) {
      console.error("[BookTalks] error creating comment =>", err);
    }
  }

  async function likeComment(commentId) {
    if (!isAuthenticated) {
      alert("Please log in to like a comment!");
      navigate("/login");
      return;
    }

    const updated = reviews.map((rev) => {
      if (rev.id === commentId) {
        const newLikes = rev.isLiked ? rev.likes - 1 : rev.likes + 1;
        return {
          ...rev,
          isLiked: !rev.isLiked,
          likes: newLikes,
        };
      }
      return rev;
    });
    setReviews(updated);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const resp = await fetch(`${baseUrl}/comments/${commentId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resp.ok) {
        throw new Error(`Failed to like/unlike comment. Status: ${resp.status}`);
      }

      await renderExistingComments();
    } catch (err) {
      console.error("[BookTalks] error liking comment =>", err);
    }
  }

  async function deleteComment(commentId) {
    if (!isAuthenticated) {
      alert("Please log in to delete a comment!");
      navigate("/login");
      return;
    }
    setReviews((prev) => prev.filter((r) => r.id !== commentId));

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const resp = await fetch(`${baseUrl}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resp.ok) {
        throw new Error(`Failed to delete comment. Status: ${resp.status}`);
      }
      console.log("[BookTalks] Deleted comment =>", commentId);

      await renderExistingComments();
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  }

  return (
    <div className="book-talks">
      <h2>BookTalk Reviews</h2>
      <BookTalksForm onBookTalk={addNewComment} />

      <BookTalkReview
        reviews={reviews}
        onLike={likeComment}
        onRemove={deleteComment}
      />
    </div>
  );
}