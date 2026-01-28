import { useState, useEffect } from "react";
import { type Mission } from "../types"; // Importar el tipo

const API_URL = "http://localhost:3001/missions";
const TEMPORARY_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2E0Mjk4Njk4NDMzYzhmZGRhYTQ3ZCIsInJvbGUiOiJhZ2VudCIsIm5hbWUiOiJKYW1lcyBCb25kIiwiaWF0IjoxNzY5NjIwMTM2LCJleHAiOjE3Njk2MjM3MzZ9._gqFY9dNsOAC_3p25bVZp05btCRw7dBIlFhgE6xcrSc"; 

export const useMissions = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch(API_URL, {
            headers: { "Authorization": `Bearer ${TEMPORARY_TOKEN}` }
        });

        if (!response.ok) {
           throw new Error(`Error ${response.status}: Acceso denegado`);
        }

        const data = await response.json();
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