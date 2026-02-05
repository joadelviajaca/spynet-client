import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();

  // 1. Si la app aún está verificando el token (F5), no hacemos nada todavía
  if (!isInitialized) {
    return <div className="p-10 text-center text-spy-green">Cargando sistema de seguridad...</div>;
  }

  // 2. Si ya terminó de cargar y NO está autenticado:
  if (!isAuthenticated) {
    // Redirigimos al Login.
    // El atributo 'state' sirve para recordar dónde quería ir el usuario
    // y devolverlo allí tras el login (UX PRO).
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Si está autenticado, le dejamos pasar (renderizamos el hijo)
  return children;
};