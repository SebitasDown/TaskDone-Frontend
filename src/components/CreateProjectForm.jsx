import { useState } from "react";
import { createProject } from "../services/ProjectService";

const CreateProjectForm = ({ onProjectCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      await createProject(name, description);
      setName("");
      setDescription("");
      onProjectCreated(); 
    } catch (error) {
      console.error("Error creando proyecto", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Crear Proyecto</h3>

      <input
        type="text"
        placeholder="Nombre del proyecto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <br />

      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />

      <button type="submit">Crear</button>
    </form>
  );
};

export default CreateProjectForm;
