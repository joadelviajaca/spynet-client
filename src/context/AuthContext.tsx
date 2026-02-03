import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User, LoginCredentials, JWTPayload } from "../types";
import { loginUser } from "../services/auth.service";
import { getMissions } from "../services/mission.service";
import { jwtDecode } from "jwt-decode";

// 1. Definimos qué datos tendrá nuestro contexto
interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (creds: LoginCredentials) => Promise<void>;
    logout: () => void;
}
// 2. Creamos el contexto (inicialmente undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// 3. Creamos el Provider (el componente que envolverá nuestra App)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem("spy_token");

            if (!storedToken) {
                setIsInitialized(true);
                return;
            }

            try {
                const response = await getMissions(storedToken);

                setToken(storedToken);
                const payload = jwtDecode<JWTPayload>(storedToken);
                setUser({
                    id: payload.id,
                    name: payload.name,
                    role: payload.role
                });


            } catch (error) {
                console.warn("Sesión caducada");
                localStorage.removeItem("spy_token");
                localStorage.removeItem("spy_user");
                setUser(null);
                setToken(null);

            } finally {
                setIsInitialized(true);
            }


        }

        initializeAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            const data = await loginUser(credentials);
            // Guardamos en estado
            localStorage.setItem("spy_token", data.token);
            const payload = jwtDecode<JWTPayload>(data.token);
            setUser({
                id: payload.id,
                name: payload.name,
                role: payload.role
            });

            setToken(data.token);
            // OJO: La semana que viene veremos cómo persistir esto en LocalStorage
            // para que no se pierda al recargar.
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("spy_token");
        localStorage.removeItem("spy_user");
    };
    return (
        <AuthContext.Provider value={{
            user, token,
            isAuthenticated: !!user, // true si hay usuario
            login, logout
        }}>
            {children} </AuthContext.Provider>
    );
};

// 4. Custom Hook para consumir el contexto
// Esto nos ahorra tener que importar useContext y AuthContext en cada componente
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};