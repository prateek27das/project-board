import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Typography, Paper, Box, TextField, Chip } from "@mui/material";
import TaskCard from "./TaskCard";

interface Task {
  id: string;
  title: string;
  status: string;
  description: string;
}

const statusColors: Record<string, string> = {
  "Not started": "#f44336",
  "In progress": "#ff9800",
  Completed: "#4caf50",
};

const initialStatuses = ["Not started", "In progress", "Completed"];

const Board: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statuses, setStatuses] = useState<string[]>(initialStatuses);
  const [newStatus, setNewStatus] = useState<string>("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (status: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: "New Task",
      status,
      description: "",
    };
    setTasks([...tasks, newTask]);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.status = result.destination.droppableId;

    updatedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(updatedTasks);
  };

  const handleAddStatus = () => {
    if (newStatus.trim() && !statuses.includes(newStatus.trim())) {
      setStatuses((prevStatuses) => [...prevStatuses, newStatus.trim()]);
      setNewStatus("");
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          {statuses.map((status) => (
            <Box
              key={status}
              width={{ xs: "100%", sm: "30%" }}
              marginBottom={{ xs: "16px", sm: "0" }}
              marginRight={2}
              style={{ marginTop: "20px" }}
            >
              <Paper style={{ padding: "16px" }}>
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="h6"
                    style={{
                      color: statusColors[status] || "#000",
                      flexGrow: 1,
                      marginBottom: "16px",
                    }}
                  >
                    {status}
                  </Typography>
                  <Chip
                    label={
                      tasks.filter((task) => task.status === status).length
                    }
                    style={{
                      backgroundColor: "#ccc",
                      color: "#000",
                      marginLeft: "10px",
                    }}
                  />
                </Box>
                <Droppable droppableId={status}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{ minHeight: "1px" }}
                    >
                      {tasks
                        .filter((task) => task.status === status)
                        .map((task) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={tasks.findIndex((t) => t.id === task.id)}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TaskCard task={task} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <Button
                  variant="outlined"
                  onClick={() => addTask(status)}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#fff",
                    color: "#888",
                    boxShadow: "none",
                    borderColor: "#fff",
                  }}
                >
                  + New
                </Button>
              </Paper>
            </Box>
          ))}
        </Box>
      </DragDropContext>

      <Box display="flex" alignItems="center" marginTop={2}>
        <TextField
          label="New Status"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          variant="outlined"
          style={{ marginRight: "10px" }}
        />
        <Button variant="contained" onClick={handleAddStatus}>
          Add Status
        </Button>
      </Box>
    </div>
  );
};

export default Board;
