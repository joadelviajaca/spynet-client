// src/components/MissionList.tsx
import { useMissions } from "../hooks/useMissions";





export const MissionList = () => {
   const {missions, loading, error} = useMissions();

  

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