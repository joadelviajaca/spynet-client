// src/components/MissionList.tsx
import { useMissions } from "../hooks/useMissions";
import { MissionCard } from "./MissionCard";





export const MissionList = () => {
  const { missions, loading, error } = useMissions();



  if (loading) return <div className="p-10 text-center text-spy-green animate-pulse">Cargando datos encriptados...</div>;
  if (error) return <div className="p-10 text-center text-red-500">🚨 ERROR: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-spy-green border-b border-spy-gray pb-2">📂 Misiones Activas</h2>
      <div className="grid gap-4">
        {missions.map((mission) => (
          <MissionCard key=
            {mission._id}
            title={mission.title}
            description={mission.description}
            difficulty={mission.difficulty}
          />
        ))}
      </div>
    </div>
  );
};