import React from "react";
import { Routes, Route } from "react-router-dom";
import Board from "./components/Board";
import TaskDetails from "./components/TaskDetails";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Board />} />
      <Route path="/task/:id" element={<TaskDetails />} />
    </Routes>
  );
};

export default App;
