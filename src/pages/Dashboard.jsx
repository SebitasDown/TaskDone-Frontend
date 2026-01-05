import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listProjects } from "../services/ProjectService";
import ProjectList from "../components/ProjectList";
import CreateProjectForm from "../components/CreateProjectForm";

const Dashboard = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
    };

    const loadProjects = async () => {
        try {
            const data = await listProjects();

            const activeProjects = data.filter(project => !project.deleted && project.status !== 'CLOSED');
            setProjects(activeProjects);
        } catch (error) {
            console.error("Error cargando proyectos", error);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Dashboard</h2>
            <p>Bienvenido al sistema.</p>

            <button onClick={handleLogout}>Cerrar Sesión</button>

            <hr />

            <CreateProjectForm onProjectCreated={loadProjects} />

            <ProjectList projects={projects} onChange={loadProjects} />
        </div>
    );
};

export default Dashboard;

