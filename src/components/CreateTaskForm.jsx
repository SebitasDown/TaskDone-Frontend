import { useState } from "react";
import { createTask } from "../services/TaskService";

const CreateTaskForm = ({ projectId, onTaskCreated }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await createTask(projectId, title, description);
            setTitle("");
            setDescription("");
            onTaskCreated();
        } catch (error) {
            console.error("Error creando tarea", error);
            if (error.response && error.response.status === 403) {
                alert("No tienes permiso para crear tareas en este proyecto.");
            }
        }
    }

    return (
        <form onSubmit={handleCreateTask} style={{ marginBottom: "20px" }}>
            <h3>Nueva Tarea</h3>
            <input
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <br />
            <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <button type="submit">Add Task</button>
        </form>
    )
}

export default CreateTaskForm;
