import React from "react";
import "./DeadEnd.css";
import { useNavigate } from "react-router-dom";

const DeadEnd = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page-container">
      <h1>Oops this is a dead end.</h1>
      <button className="btn" onClick={() => navigate("/")}>
        Go back
      </button>
    </div>
  );
};

export default DeadEnd;
