import type { Mission } from "../types";

const API_URL = "http://localhost:3001/missions";
const TEMPORARY_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2IyMThhZTcxZDQxZTkyZDI1YjE3NCIsInJvbGUiOiJhZ2VudCIsIm5hbWUiOiJKYW1lcyBCb25kIiwiaWF0IjoxNzY5NjgzNDkzLCJleHAiOjE3Njk2ODcwOTN9.KeAcXNEtzX84okrCpX0JzOJroW52XUEKO3pMKoqbsVo";

export const getMissions = async (): Promise<Mission[]> => {
    const response = await fetch(API_URL, {
        headers: {
            "Authorization": `Bearer ${TEMPORARY_TOKEN}`
        }
    })

    if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudieron cargar las misiones`)
    }

    return response.json();
}