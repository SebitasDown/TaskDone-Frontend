import ProjectCard from "./ProjectCard";


function ProjectList ({projects, onChange}){
    if(projects.length === 0){
        return <p>No hay proyectos aún</p>
    }

    return (
        <div>
            {projects.map(project => (
                <ProjectCard
                key={project.id}
                project={project}
                onChange={onChange}
                />
            ))}
            </div>
  );
}

export default ProjectList