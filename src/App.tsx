// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { MissionList } from "./components/MissionList"; // Tu componente de ayer
import { useAuth } from "./context/AuthContext";
import { LoginTemp } from "./components/LoginTemp";
import { LoginPage } from "./pages/LoginPage";
import { RequireAuth } from "./components/RequireAuth";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}

        {/* 🔐 ZONA PRIVADA (SpyNet) 
            Envolvemos el Layout Privado con RequireAuth.
            Si no estás logueado, ni siquiera se renderiza el MainLayout.
        */}
        <Route path="/dashboard" element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }>
           <Route index element={<MissionList />} />
           {/* Aquí irían más rutas: /dashboard/profile, /dashboard/settings, etc. */}
        </Route>

        {/* 👤 LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* 404 - Cualquier otra ruta redirige a la home */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;