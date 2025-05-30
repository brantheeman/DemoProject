import React, { useState, useEffect } from "react";
import { isAdmin } from "../helper/auth";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("Raw data from API:", data);

      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
    fetchTasks();
  },[token]);


  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ task: { title, description } }),
      });

      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
    setEditingDescription(task.description);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/v1/tasks/${editingTaskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          task: {
            title: editingTitle,
            description: editingDescription,
          },
        }),
      });

      const updatedTask = await res.json();
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
      setEditingTaskId(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>

      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingTaskId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <strong>{task.title}</strong> — {task.description}
                <button onClick={() => handleEdit(task)}>Edit</button>
                {/* <button onClick={() => handleDelete(task.id)}>Delete</button> */}
                {task.completed ? (
                  <span> (Completed)</span>
                ) : (
                  <span> (Not Completed)</span>
                )}
                {task.assigned_to && (
                  <span> (Assigned to: {task.assigned_to.name})</span>
                )}
                {isAdmin() && (
                  <button onClick={handleDelete}>Delete</button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
