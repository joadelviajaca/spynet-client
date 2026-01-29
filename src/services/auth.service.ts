// src/services/auth.service.ts
import type { LoginCredentials, AuthResponse } from "../types"; // Definid estos tipos en /types

const API_URL = "http://localhost:3001/auth";

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        throw new Error("Credenciales incorrectas");
    }
    return response.json(); // Devuelve { token, user }
};