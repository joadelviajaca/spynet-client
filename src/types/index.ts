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
    email: string;
    name: string;
    role: string;
}