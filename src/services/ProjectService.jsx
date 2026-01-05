
import api from "../api/api";

export const createProject = async (name, description) => {
    const response = await api.post('/projects', { name, description })
    return response.data
}

export const listProjects = async () => {
    const response = await api.get('/projects');
    return response.data
}


export const activateProject = async (projectId) => {
    const response = await api.put(`/projects/${projectId}/activate`, {})
    return response.data
}


export const closeProject = async (projectId) => {
    const response = await api.put(`/projects/${projectId}/close`, {})
    return response.data
}

// se puede hacer una funcion para desactivar/eliminar el proyecto a futuro

export const deleteProject = async (projectId) => {
    await api.delete(`/projects/${projectId}`)
}