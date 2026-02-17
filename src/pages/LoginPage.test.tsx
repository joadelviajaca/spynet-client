import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginPage } from './LoginPage';
import { describe, it, expect, vi, beforeEach } from 'vitest';
// ----------------------------------------------------------------------
// 🎭 ZONA DE MOCKS
// ----------------------------------------------------------------------
// 1. Mockeamos el hook de navegación
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate, // Cuando alguien pida useNavigate, le     damos nuestro espía
}));
// 2. Mockeamos el contexto de autenticación
const mockLogin = vi.fn();
vi.mock('../context/AuthContext', () => ({
    useAuth: () => ({
        login: mockLogin, // Devolvemos nuestra función espía
    }),
}));
// ----------------------------------------------------------------------
// 🧪 TESTS
// ----------------------------------------------------------------------
describe('LoginPage', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Limpiar contadores de los espías
    });
    it('debería renderizar el formulario correctamente', () => {
        render(<LoginPage />);
        // Verificamos elementos clave
        expect(screen.getByText('Identificación Agente')).toBeInTheDocument();
        // Nota: Busca por el texto exacto del <label>
        expect(screen.getByLabelText(/Email Operativo/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {
            name: /Acceder al Sistema/i
        })).toBeInTheDocument();
    });
    it('debería permitir escribir en los inputs', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);
        const emailInput = screen.getByLabelText(/Email Operativo/i);
        const passwordInput = screen.getByLabelText(/Código de Acceso/i);
        // Interactuamos
        await user.type(emailInput, 'bond@mi6.com');
        await user.type(passwordInput, 'secret123');
        // Verificamos que el estado cambió (lo que ve el usuario)
        expect(emailInput).toHaveValue('bond@mi6.com');
        expect(passwordInput).toHaveValue('secret123');
    });
    it('debería llamar a login y navegar al dashboard al enviar', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);
        // 1. Llenamos el formulario
        await user.type(screen.getByLabelText(/Email/i), 'bond@mi6.com');
        await user.type(screen.getByLabelText(/Código/i), '1234');
        // 2. Click en enviar
        await user.click(screen.getByRole('button', { name: /Acceder/i }));
        // 3. Verificamos que se llamó a la función login del contexto
        expect(mockLogin).toHaveBeenCalledTimes(1);
        expect(mockLogin).toHaveBeenCalledWith({
            email: 'bond@mi6.com',
            password: '1234'
        });
        // 4. Verificamos la redirección
        // IMPORTANTE: Como login es asíncrono, hay que esperar a que termine
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });
    it('debería mostrar error si el login falla', async () => {
        const user = userEvent.setup();
        // Simulamos que la función login falla
        mockLogin.mockRejectedValueOnce(new Error('Fallo de seguridad'));
        render(<LoginPage />);
        // Llenamos y enviamos
        await user.type(screen.getByLabelText(/Email/i),
            'malvado@spectre.com');
        await user.click(screen.getByRole('button', { name: /Acceder/i }));
        // Esperamos a que aparezca el mensaje de error en pantalla
        // Nota: Tu componente muestra el error en un div rojo
        const errorMessage = await screen.findByText(/Credenciales inválidas /i);
        expect(errorMessage).toBeInTheDocument();
        // Aseguramos que NO navegó
        expect(mockNavigate).not.toHaveBeenCalled();
    });
});