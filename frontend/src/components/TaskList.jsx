
import API from "../services/api";

function TaskList({ tasks, fetchTasks, setEditTask }) {

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <h2>Task List</h2>

      {tasks.map((task) => (
        <div className="task-card" key={task.id}>
          
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>Status: {task.status}</p>

          <button
            onClick={() => setEditTask(task)}
          >
            Edit
          </button>

          <button
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
