import { useEffect, useState } from "react";
import API from "../services/api";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      

      {/* MAIN */}
      <div className="main">

        <div className="header">
          Dashboard
        </div>

        {/* FORM */}
        <div className="form-card">
          <TaskForm
            fetchTasks={fetchTasks}
            editTask={editTask}
            setEditTask={setEditTask}
          />
        </div>

        {/* TASK LIST */}
        <div className="task-grid">
          <TaskList
            tasks={tasks}
            fetchTasks={fetchTasks}
            setEditTask={setEditTask}
          />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;