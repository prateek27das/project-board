import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    status: string;
    description: string;
  };
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/task/${task.id}`)}
      style={{ marginBottom: "8px", cursor: "pointer" }}
    >
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2">{task.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
