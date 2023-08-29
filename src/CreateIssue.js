// CreateIssue.js
import React, { useState } from "react";
import axios from "axios";
import "./CreateIssueStyle.css";

function CreateIssue() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://api.github.com/repos/{owner}/{repo}/issues",
        { title, body }
      );

      // You can handle successful creation, like redirecting or showing a success message.
      console.log("New issue created:", response.data);
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  return (
    <div className="create-issue-container">
      <h2>Create New Issue</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body" className="label">
            Comment:
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Issue</button>
      </form>
    </div>
  );
}

export default CreateIssue;
