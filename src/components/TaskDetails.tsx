import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const foundTask = tasks.find((t: Task) => t.id === id);
    setTask(foundTask || null);
  }, [id]);

  const updateTask = () => {
    if (!task) return;

    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = tasks.map((t: Task) => (t.id === id ? task : t));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/");
  };

  const deleteTask = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const filteredTasks = tasks.filter((t: Task) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    navigate("/");
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        style={{ marginBottom: "16px" }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        style={{ marginBottom: "10px" }}
      />
      <Box display="flex">
        <Button
          variant="contained"
          onClick={updateTask}
          style={{ marginRight: "10px" }}
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={deleteTask}
          style={{ marginRight: "10px" }}
        >
          Delete
        </Button>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Back
        </Button>
      </Box>
    </div>
  );
};

export default TaskDetails;
