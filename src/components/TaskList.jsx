import { completeTask } from "../services/TaskService";

const TaskList = ({ tasks, onTaskUpdated }) => {

    const handleComplete = async (taskId) => {
        try {
            await completeTask(taskId);
            onTaskUpdated();
        } catch (error) {
            console.error("Error completando tarea", error);
            if (error.response && error.response.status === 400) {
                alert("No se pudo completar la tarea. Es posible que ya esté completada o el servidor requiera datos adicionales.");
            } else {
                alert("Error al completar la tarea.");
            }
        }
    }

    if (tasks.length === 0) {
        return <p>No hay tareas en este proyecto.</p>
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tasks.map(task => (
                <div key={task.id} style={{ border: '1px solid #ccc', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <h4>{task.title} {task.completed && "✅"}</h4>
                        <p>{task.description}</p>
                    </div>
                    {!task.completed && (
                        <button onClick={() => handleComplete(task.id)}>Complete</button>
                    )}
                </div>
            ))}
        </div>
    )
}

export default TaskList;
