// src/components/MissionList.tsx
import { useEffect, useState } from "react";

// Definimos la interfaz aquí mismo (luego la moveremos)
interface Mission {
  _id: string;
  title: string;
  description: string;
  status: string;
  difficulty: "Baja" | "Media" | "Alta" | "Imposible";
}

// ⚠️ HARDCODE: Pide a los alumnos que peguen aquí un token válido de su Postman
const TEMPORARY_TOKEN = "pegar_token_jwt_aqui"; 

export const MissionList = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/missions", {
      headers: {
        "Authorization": `Bearer ${TEMPORARY_TOKEN}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fallo de seguridad al obtener misiones");
        return res.json();
      })
      .then((data) => {
        setMissions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-center text-spy-green animate-pulse">Cargando datos encriptados...</div>;
  if (error) return <div className="p-10 text-center text-red-500">🚨 ERROR: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-spy-green border-b border-spy-gray pb-2">📂 Misiones Activas</h2>
      <div className="grid gap-4">
        {missions.map((mission) => (
          <div key={mission._id} className="bg-spy-gray p-4 rounded-lg border-l-4 border-spy-green hover:bg-slate-700 transition-colors">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-white">{mission.title}</h3>
              <span className={`px-2 py-1 rounded text-xs font-bold ${
                mission.difficulty === 'Imposible' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
              }`}>
                {mission.difficulty}
              </span>
            </div>
            <p className="text-gray-300 mt-2">{mission.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};