// src/hooks/useMissions.ts
import { useState, useEffect } from "react";
import { type Mission } from "../types"; // Importar el tipo
import { getMissions } from "../services/mission.service";



export const useMissions = () => {

    const [missions, setMissions] = useState<Mission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const data = await getMissions();
                setMissions(data);
            } catch (err) {
                // TypeScript safe error handling
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Error desconocido");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchMissions();
    }, []);
    // Retornamos "la interfaz pública" del hook
    return { missions, loading, error };
};