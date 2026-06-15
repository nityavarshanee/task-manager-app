
import { useState, useEffect } from "react";
import API from "../services/api";

function TaskForm({
  fetchTasks,
  editTask,
  setEditTask
}) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending"
  });

  useEffect(() => {
    if (editTask) {
      setTask({
        title: editTask.title,
        description: editTask.description,
        status: editTask.status
      });
    }
  }, [editTask]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editTask) {
        await API.put(
          `/tasks/${editTask.id}`,
          task
        );

        alert("Task Updated Successfully");

        setEditTask(null);
      } else {
        await API.post("/tasks", task);

        alert("Task Added Successfully");
      }

      setTask({
        title: "",
        description: "",
        status: "Pending"
      });

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {editTask ? "Update Task" : "Add Task"}
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleChange}
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
      />

      <select
        name="status"
        value={task.status}
        onChange={handleChange}
      >
        <option value="Pending">
          Pending
        </option>

        <option value="Completed">
          Completed
        </option>
      </select>

      <button type="submit">
        {editTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;

