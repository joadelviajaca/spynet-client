// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export const MainLayout = () => {
    const { user, logout } = useAuth();
    return (
        <div className="min-h-screen bg-spy-dark text-white">
            {/* Navbar Superior */}
            <nav className="bg-spy-gray p-4 border-b border-spy-green flex justify-between itemscenter">
                <span className="text-xl font-bold text-spy-green">️ SpyNet</span>
                <div className="flex gap-4 items-center">
                    <span>Agente: {user?.name}</span>
                    <button
                        onClick={logout}
                        className="text-sm bg-red-900/50 px-3 py-1 rounded hover:bg-red-800 transition"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </nav>
            {/* Aquí se renderizarán las hijas (Misiones, Perfil, etc.) */}
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    );
};