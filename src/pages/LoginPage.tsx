// src/pages/LoginPage.tsx
import { useState, type SyntheticEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/dashboard"); // Redirigir al entrar
    } catch (err) {
      setError("Credenciales inválidas (Prueba: bond@mi6.com / 1234)");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-spy-dark">
      <div className="bg-spy-gray p-8 rounded-lg shadow-2xl w-96 border border-spy-green/30">
        <h2 className="text-2xl font-bold text-spy-green mb-6 text-center">Identificación Agente</h2>
        {error && <div className="bg-red-900/50 text-red-200 p-2 text-sm rounded mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Email Operativo</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-spy-green"
              placeholder="agente@mi6.com"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Código de Acceso</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-spy-green"
            />
          </div>
          <button type="submit" className="w-full bg-spy-green text-spy-dark font-bold py-2 rounded hover:bg-emerald-400 transition">
            Acceder al Sistema
          </button>
        </form>
      </div>
    </div>
  );
};