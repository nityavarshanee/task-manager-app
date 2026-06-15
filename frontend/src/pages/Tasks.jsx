
import { useEffect, useState } from "react";
import API from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editId, setEditId] = useState(null);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const addTask = async () => {
    try {
      await API.post("/tasks", {
        title,
        description,
        status,
      });

      alert("Task Added Successfully");

      setTitle("");
      setDescription("");
      setStatus("Pending");

      fetchTasks();
    } catch (error) {
      console.log("Add Error:", error);
    }
  };

  // Edit Task
  const editTask = (task) => {
    setEditId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  };

  // Update Task
  const updateTask = async () => {
    try {
      await API.put(`/tasks/${editId}`, {
        title,
        description,
        status,
      });

      alert("Task Updated Successfully");

      setEditId(null);
      setTitle("");
      setDescription("");
      setStatus("Pending");

      fetchTasks();
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      alert("Task Deleted Successfully");

      fetchTasks();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <br />
      <br />

      {editId ? (
        <button onClick={updateTask}>
          Update Task
        </button>
      ) : (
        <button onClick={addTask}>
          Add Task
        </button>
      )}

      <hr />

      <h2>Task List</h2>

      {tasks.length === 0 ? (
        <p>No Tasks Found</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              <strong>Status:</strong> {task.status}
            </p>

            <button
              onClick={() => editTask(task)}
            >
              Edit
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Tasks;
