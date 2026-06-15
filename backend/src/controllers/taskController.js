const db = require("../config/db");

exports.getAllTasks = (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getTaskById = (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};


exports.createTask = (req, res) => {
  const { title, description, status } = req.body;

  console.log("TASK DATA:", req.body);

  if (!title || !description) {
    return res.status(400).json({
      message: "Title and Description required"
    });
  }

  const sql =
    "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)";

  const values = [title, description, status || "Pending"];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json(err);
    }

    res.json({
      message: "Task Created Successfully",
      taskId: result.insertId
    });
  });
};

exports.updateTask = (req, res) => {
  console.log("UPDATE ID:", req.params.id);
  console.log("UPDATE BODY:", req.body);

  const { title, description, status } = req.body;

  db.query(
    "UPDATE tasks SET title=?, description=?, status=? WHERE id=?",
    [title, description, status, req.params.id],
    (err, result) => {
      if (err) {
        console.log("UPDATE ERROR:", err);
        return res.status(500).json(err);
      }

      console.log("MYSQL RESULT:", result);

      res.json({
        message: "Task Updated Successfully"
      });
    }
  );
};
exports.deleteTask = (req, res) => {
  db.query(
    "DELETE FROM tasks WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Task Deleted"
      });
    }
  );
};