// Definimos la interfaz aquí mismo (luego la moveremos)
export interface Mission {
  _id: string;
  title: string;
  description: string;
  status: string;
  difficulty: "Baja" | "Media" | "Alta" | "Imposible";
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface User {
    id: string;
    name: string;
    role: string;
}

export interface JWTPayload {
  id: string;
  name: string;
  role: 'admin' | 'agent';
  exp: number; // El token siempre trae fecha de expiración (unix timestamp)
  iat: number; // Issued At
}

