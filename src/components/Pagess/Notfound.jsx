import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {

  const navigate = useNavigate();

  return (
    <div className="notfound">

      <h1>404 Not Found</h1>

      <p>
        Your visited page not found. You may go home page.
      </p>

      <button onClick={() => navigate("/")}>
        Back to home page
      </button>

    </div>
  );
}

export default NotFound;