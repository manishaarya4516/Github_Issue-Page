import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./IssueDetailStyle.css";

function IssueDetail() {
  const { issueNumber } = useParams();
  const [issue, setIssue] = useState(null);
  const [comment, setComment] = useState("");
  const [newComment, setNewComment] = useState(null); // New state for the new comment

  const fetchIssue = async () => {
    try {
      const [issueResponse, commentsResponse] = await Promise.all([
        axios.get(
          `https://api.github.com/repos/facebook/react/issues/${issueNumber}`
        ),
        axios.get(
          `https://api.github.com/repos/facebook/react/issues/${issueNumber}/comments`
        ),
      ]);

      const issueData = issueResponse.data;
      const commentsData = commentsResponse.data;

      // Merge comments into the issue object
      issueData.comments = commentsData;

      setIssue(issueData);
    } catch (error) {
      console.error("Error fetching issue and comments:", error);
    }
  };

  useEffect(() => {
    fetchIssue();
  }, [issueNumber, comment, newComment]); // Include newComment in the dependencies

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(
        ` https://api.github.com/repos/OWNER/REPO/issues/comments/COMMENT_ID`,
        { body: comment }
      );

      // Set the new comment state to the submitted comment
      setNewComment(response.data);

      // Clear comment field
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (!issue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="issue-detail-container">
      <h2>{issue.title}</h2>
      <p>{issue.body}</p>

      <div className="comments-section">
        <h3>Comments</h3>
        <ul className="comments">
          {issue.comments.map((comment) => (
            <li key={comment.id} className="commentbody">
              {comment.body}
            </li>
          ))}
          {newComment && <li>{newComment.body}</li>}{" "}
          {/* Render the new comment */}
        </ul>
      </div>

      <div className="comment-section">
        <h3>Add Comment</h3>
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Type your comment here..."
        />
        <button onClick={handleCommentSubmit}>Submit Comment</button>
      </div>
    </div>
  );
}

export default IssueDetail;
