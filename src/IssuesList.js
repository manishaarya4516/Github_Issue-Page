import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import "./IssueListStyle.css";
import { Link } from "react-router-dom";

function IssuesList() {
  const [issues, setIssues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [issuesPerPage] = useState(10);

  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await axios.get(
          "https://api.github.com/repos/facebook/react/issues?state=open"
        );
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    }

    fetchIssues();
  }, []);

  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="issues-list-container">
      <h1>GitHub Issues Pages</h1>
      <Link to="/create-issue" className="create-issue-btn">
        Create New Issue
      </Link>
      <ul className="ullist">
        {currentIssues.map((issue) => (
          <li key={issue.id} className="lilist">
            <a href={`/issue/${issue.number}`}>{issue.title}</a>
          </li>
        ))}
      </ul>
      <Pagination
        issuesPerPage={issuesPerPage}
        totalIssues={issues.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default IssuesList;
