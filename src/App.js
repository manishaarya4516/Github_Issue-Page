import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IssuesList from "./IssuesList";
import IssueDetail from "./IssueDetail";
import CreateIssue from "./CreateIssue";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<IssuesList />} />
          <Route path="/issue/:issueNumber" element={<IssueDetail />} />
          <Route path="/create-issue" element={<CreateIssue />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
