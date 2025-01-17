import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import BookTalkReview from "./BookTalkReview";
import "./BookTalks.css";
import BookTalksForm from "./BookTalksForm";

export default function BookTalks({ bookId }) {
  const { token, user, isAuthenticated } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function renderExistingComments() {
    if (!bookId) return;

    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      console.log("[BookTalks] GET /comments?itemId=", bookId);

      const response = await fetch(`${baseUrl}/comments?itemId=${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch comments. Status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.comments) {
        throw new Error("No 'comments' array in response");
      }

      const uniqueUserIds = [...new Set(data.comments.map((c) => c.user))];
      const userMap = {};
      for (const uid of uniqueUserIds) {
        if (!uid) continue;
        try {
          const userResp = await fetch(`${baseUrl}/auth/profile/public?id=${uid}`);
          if (!userResp.ok) {
            console.error(`[BookTalks] GET user ${uid} =>`, userResp.status);
            userMap[uid] = { name: "Anonymous", photo: "" };
          } else {
            const userData = await userResp.json();
            userMap[uid] = {
              name: userData?.name || "Anonymous",
              photo: userData?.photo || "",
            };
          }
        } catch (err) {
          console.error(`[BookTalks] error fetching user ${uid}:`, err);
          userMap[uid] = { name: "Anonymous", photo: "" };
        }
      }

      const normalized = data.comments.map((c) => {
        const userObj = userMap[c.user] || { name: "Anonymous", photo: "" };
        return {
          id: c._id,
          review: c.text,
          username: userObj.name,
          photo: userObj.photo,
          likes: c.likeCount || 0,
          isLiked: user && Array.isArray(c.likes) && c.likes.includes(user._id),
        };
      });

      setReviews(normalized);
      console.log("[BookTalks] final reviews =>", normalized);
    } catch (err) {
      console.error("[BookTalks] renderExistingComments error:", err);
    } finally {
      setIsLoading(false);
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

    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const body = {
        book: bookId,
        text: newReview.review,
      };

      console.log("[BookTalks] POST /comments =>", body);

      const response = await fetch(`${baseUrl}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Failed to create comment. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("[BookTalks] Created comment =>", data.comment);

      await renderExistingComments();
    } catch (err) {
      console.error("[BookTalks] error creating comment =>", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function likeComment(commentId) {
    if (!isAuthenticated) {
      alert("Please log in to like a comment!");
      navigate("/login");
      return;
    }

    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/comments/${commentId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to like/unlike comment. Status: ${response.status}`);
      }

      await renderExistingComments();
    } catch (err) {
      console.error("[BookTalks] error liking comment =>", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteComment(commentId) {
    if (!isAuthenticated) {
      alert("Please log in to delete a comment!");
      navigate("/login");
      return;
    }

    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting comment:", errorData);
        alert(`Error: ${errorData.error || "Failed to delete comment"}`);
        return;
      }

      console.log("[BookTalks] Deleted comment =>", commentId);

      setReviews((prev) => prev.filter((r) => r.id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert("An error occurred while deleting the comment.");
    } finally {
      setIsLoading(false);
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