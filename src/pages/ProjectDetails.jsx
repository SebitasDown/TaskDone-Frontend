import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listTasks } from "../services/TaskService";
import TaskList from "../components/TaskList";
import CreateTaskForm from "../components/CreateTaskForm";

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {
        try {
            const data = await listTasks(id);
            setTasks(data);
        } catch (error) {
            console.error("Error cargando tareas", error);
        }
    }

    useEffect(() => {
        loadTasks();
    }, [id]);

    return (
        <div style={{ padding: "20px" }}>
            <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
            <h2>Proyecto {id}</h2>

            <CreateTaskForm projectId={id} onTaskCreated={loadTasks} />

            <hr />

            <TaskList tasks={tasks} onTaskUpdated={loadTasks} />
        </div>
    )
}

export default ProjectDetails;
