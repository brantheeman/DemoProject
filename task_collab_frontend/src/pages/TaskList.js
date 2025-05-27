import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function TaskList() {
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    api.get("/tasks")
      .then((res) => {
        setMessage(res.data.message);
        setUserEmail(res.data.user);
      })
      .catch((err) => {
        console.error("Error fetching tasks", err);
        setMessage("Failed to fetch tasks. Are you logged in?");
      });
  }, []);

  return (
    <div>
      <h2>Protected Task List</h2>
      <p>{message}</p>
      {userEmail && <p>Logged in as: {userEmail}</p>}
    </div>
  );
}
