import { render, screen } from '@testing-library/react';
import { MissionCard } from './MissionCard';
import { describe, it, expect } from 'vitest';


describe('MissionCard Component', () => {
    // Test 1: Contenido básico
    it('debería renderizar el título y la descripción correctamente', () => {
        // 1. ARRANGE
        const props = {
            title: 'Operación Skyfall',
            description: 'Recuperar el disco duro perdido',
            difficulty: 'Alta'
        };
        // 2. ACT
        // Render genera el HTML en memoria
        render(<MissionCard {...props} />);
// 3. ASSERT
// screen.getByText busca coincidencias exactas (o regex). Si falla, explota el test.
            // .toBeInTheDocument() confirma que el nodo existe en el DOM.
            expect(screen.getByText('Operación Skyfall')).toBeInTheDocument();
            expect(screen.getByText('Recuperar el disco duro perdido')).toBeInTheDocument();
});
    // Test 2: Lógica condicional (Clases CSS)
    it('debería mostrar el badge rojo si la dificultad es Imposible', () => {
        render(
            <MissionCard title="Misión Test"
                description="Test" difficulty="Imposible" />
        );
        const badge = screen.getByText('Imposible');
        expect(badge).toBeInTheDocument();
        // Verificamos que la clase condicional se aplicó
        expect(badge).toHaveClass('bg-red-600');
    });
});