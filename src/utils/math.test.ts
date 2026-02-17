import { describe, it, expect } from 'vitest';
// Imaginad que esta función está en un archivo real
const sumar = (a: number, b: number) => a + b;


describe('Módulo de Matemáticas', () => {
    it('debería sumar 2 + 2 correctamente', () => {
        // Expectativa: Si sumo 2 y 2, espero que sea 4.
        expect(sumar(2, 2)).toBe(4);
    });
    // ¡Probad a romperlo! Cambiad el 4 por un 5 para ver cómo falla.
});


describe('Módulo de Matemáticas', () => {
    it('debería sumar 2 + 2 correctamente', () => {
        // Expectativa: Si sumo 2 y 2, espero que sea 4.
        expect(sumar(3, 2)).toBe(5);
    });
    // ¡Probad a romperlo! Cambiad el 4 por un 5 para ver cómo falla.
});