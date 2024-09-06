// frontend/pages/index.js
"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/projects')
      .then((response) => response.json())
      .then((data) => setProjects(data));
  }, []);

  const addProject = async () => {
    const res = await fetch('http://localhost:4000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, status }),
    });
    const newProject = await res.json();
    setProjects([...projects, newProject]); // Actualizar la lista de proyectos
  };

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name} - {project.status}</li>
        ))}
      </ul>

      <h2>Add a New Project</h2>
      <input
        type="text"
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button onClick={addProject}>Add Project</button>
    </div>
  );
}
