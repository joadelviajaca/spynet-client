interface MissionCardProps {
    title: string;
    description: string;
    difficulty: 'Baja' | 'Media' | 'Alta' | 'Imposible' | string;
}

export const MissionCard = ({ title, description, difficulty }:
    MissionCardProps) => {
    return (
        <div className="bg-spy-gray p-4 rounded-lg border-l-4 border-spy-green
hover:bg-slate-700 transition-colors shadow-sm">
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <span
                    className={`px-2 py-1 rounded text-xs font-bold ${difficulty === "Imposible"
                            ? "bg-red-600 text-white" : "bg-blue-600 text-white"
                        }`} >
                    {difficulty} </span>
            </div>
            <p className="text-gray-300 mt-2">{description}</p>
        </div>
    );
};