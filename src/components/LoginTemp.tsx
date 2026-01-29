import { useAuth } from "../context/AuthContext";

// Componente temporal de Login (La semana que viene haremos el bueno con Form)
export const LoginTemp = () => {
  const { login } = useAuth();
  return (
    <div className="h-screen flex items-center justify-center bg-spy-dark">
      <div className="p-8 bg-spy-gray rounded shadow-lg text-center">
        <h1 className="text-2xl text-spy-green mb-4">Acceso Restringido</h1>
        <button
          onClick={() => login({ email: "bond@mi6.com", password: "1234" })}
          className="bg-spy-green text-spy-dark font-bold py-2 px-4 rounded hover:bg-emerald400"
        >
          Simular Login (Agente 007)
        </button>
      </div>
    </div>
  );
};