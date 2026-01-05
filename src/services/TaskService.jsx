import api from "../api/api";

export const createTask = async (projectId, title, description) => {
    const response = await api.post(`/projects/${projectId}/tasks`, { title, description })
    return response.data
}

export const listTasks = async (projectId) => {
    const response = await api.get(`/projects/${projectId}/tasks`)
    return response.data
}

export const completeTask = async (taskId) => {
    const response = await api.put(`/tasks/${taskId}/complete`, {})
    return response.data
}