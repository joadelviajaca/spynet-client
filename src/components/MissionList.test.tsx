import { render, screen } from '@testing-library/react';
import { MissionList } from './MissionList';
import { describe, it, expect, vi } from 'vitest';
import type { Mission } from '../types'; // Importar el tipo si lo tienes
// ----------------------------------------------------------------------
// 🎭 ZONA DE MOCKS
// ----------------------------------------------------------------------
// Mockeamos el hook. Inicialmente devolveremos valores por defecto.
const mockUseMissions = vi.fn();
vi.mock('../hooks/useMissions', () => ({
    useMissions: () => mockUseMissions() // Redirigimos la llamada a nuestro mock 
}));
// ----------------------------------------------------------------------
// 🧪 TESTS
// ----------------------------------------------------------------------
describe('MissionList Component', () => {
    it('debería mostrar el mensaje de carga inicial', () => {
        // Simulamos que el hook está cargando
        mockUseMissions.mockReturnValue({
            missions: [],
            loading: true,
            error: null
        });
        render(<MissionList />);
        expect(screen.getByText(/Cargando datos encriptados/i)).toBeInTheDocument();
    });
    it('debería mostrar un error si falla la carga', () => {
        // Simulamos que el hook devolvió un error
        mockUseMissions.mockReturnValue({
            missions: [],
            loading: false,
            error: 'Fallo en el satélite'
        });
        render(<MissionList />);
        expect(screen.getByText(/🚨 ERROR: Fallo en el satélite/i)).toBeInTheDocument();
    });
    it('debería renderizar la lista de misiones cuando hay datos', () => {
        // Datos falsos de prueba
        const fakeMissions = [
            {
                _id: '1', title: 'Operación Trueno', difficulty: 'Baja',
                description: 'Desc'
            },
            {
                _id: '2', title: 'Operación Skyfall', difficulty: 'Imposible',
                description: 'Desc'
            }
        ];
        // Simulamos éxito
        mockUseMissions.mockReturnValue({
            missions: fakeMissions,
            loading: false,
            error: null
        });
        render(<MissionList />);
        // Verificamos que ya NO sale cargando
        expect(screen.queryByText(/Cargando/i)).not.toBeInTheDocument();
        // Verificamos que salen los títulos
        expect(screen.getByText('Operación Trueno')).toBeInTheDocument();
        expect(screen.getByText('Operación Skyfall')).toBeInTheDocument();
        // Verificamos lógica visual (Baja = Azul, Imposible = Rojo)
        // Nota: Esto depende de cómo tengas las clases CSS en tu código         proporcionado
        const skyfallBadge = screen.getByText('Imposible');
        expect(skyfallBadge).toHaveClass('bg-red-600');
    });
    it('debería manejar una lista vacía sin explotar', () => {
        mockUseMissions.mockReturnValue({
            missions: [],
            loading: false,
            error: null
        });
        render(<MissionList />);
        expect(screen.getByText('📂 Misiones Activas')).toBeInTheDocument();
        // No debería haber ninguna tarjeta
        const cards = screen.queryAllByText(/Operación/i);
        expect(cards).toHaveLength(0);
    });
});