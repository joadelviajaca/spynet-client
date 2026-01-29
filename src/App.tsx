// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { MissionList } from "./components/MissionList"; // Tu componente de ayer
import { useAuth } from "./context/AuthContext";
import { LoginTemp } from "./components/LoginTemp";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <LoginTemp />
        } />
        {/* Rutas Privadas (Protegidas por MainLayout) */}
        {/* Nota: La protección real con <RequireAuth> la veremos la semana que viene.
Por ahora, si no hay usuario, el MainLayout mostrará "Agente: undefined" */}
        <Route path="/" element={<MainLayout />}>
          {/* Redirigir la raíz al dashboard */}
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={
            // Condicional simple para hoy (Mejora la semana que viene)
            isAuthenticated ? <MissionList /> : <Navigate to="/login" />
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;