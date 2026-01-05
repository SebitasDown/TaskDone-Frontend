import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { activateProject, closeProject, deleteProject } from "../services/ProjectService";
import { listTasks } from "../services/TaskService";
import TaskList from "./TaskList";
import CreateTaskForm from "./CreateTaskForm";

function ProjectCard({ project, onChange }) {
  const navigate = useNavigate();
  const [showTasks, setShowTasks] = useState(false);
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const data = await listTasks(project.id);
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks", error);
      if (error.response && error.response.status === 403) {
        alert("No tienes permiso para ver las tareas de este proyecto.");
      }
    }
  };

  const toggleTasks = () => {
    if (!showTasks) {
      loadTasks();
    }
    setShowTasks(!showTasks);
  };

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      marginBottom: "0.5rem",
      borderRadius: "8px",
      backgroundColor: "#1e293b"
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate(`/projects/${project.id}`)}>
          {project.status === "ACTIVE" ? "🟢" : "🔴"} {project.name}
        </h3>
        <div>
          <button style={{ marginRight: '5px', backgroundColor: '#eab308' }} onClick={async () => {
            try {
              await activateProject(project.id);
              onChange(); // Recargar la lista
            } catch (error) {
              console.error("Error activando proyecto", error);
              if (error.response && error.response.status === 500) {
                alert("Error interno del servidor al activar el proyecto.");
              } else {
                alert("Error al activar el proyecto.");
              }
            }
          }}>
            Activar
          </button>
          <button style={{ marginRight: '5px' }} onClick={async () => {
            await closeProject(project.id);
            onChange();
          }}>
            Cerrar
          </button>
        </div>
      </div>

      <p style={{ color: '#94a3b8' }}>{project.description}</p>

      <button onClick={toggleTasks} style={{ width: '100%', marginTop: '10px', backgroundColor: '#3b82f6' }}>
        {showTasks ? "Ocultar Tareas" : "Ver Tareas"}
      </button>

      {showTasks && (
        <div style={{ marginTop: '20px', padding: '10px', borderTop: '1px solid #475569' }}>
          <CreateTaskForm projectId={project.id} onTaskCreated={loadTasks} />
          <div style={{ marginTop: '15px' }}>
            <TaskList tasks={tasks} onTaskUpdated={loadTasks} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
