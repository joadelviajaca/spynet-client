import { loginUser } from './auth.service';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// 1. Mock Global de Fetch
const fetchMock = vi.fn();
vi.stubGlobal('fetch', fetchMock);
// global.fetch = vi.fn();

// Helper para tener autocompletado de TypeScript en el mock
// const fetchMock = global.fetch as any;

describe('Auth Service - loginUser', () => {

  beforeEach(() => {
    vi.restoreAllMocks(); // Limpieza antes de cada test
  });

  it('debería devolver el token y el usuario si la API responde OK', async () => {
    // A. ARRANGE (Preparamos la respuesta falsa)
    const mockResponse = { 
        token: 'fake-jwt-token', 
        user: { name: '007', email: 'bond@mi6.com' } 
    };

    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    // B. ACT (Ejecutamos la función real)
    const creds = { email: 'bond@mi6.com', password: '123' };
    const result = await loginUser(creds);

    // C. ASSERT (Verificamos)

    // Verificamos que llamó a la URL correcta con POST
    expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(creds)
        })
    );

    // Verificamos que devolvió los datos procesados
    expect(result).toEqual(mockResponse);
  });

  it('debería lanzar un error si las credenciales son incorrectas', async () => {
    // A. ARRANGE (Simulamos un error 401)
    fetchMock.mockResolvedValue({
      ok: false,
      status: 401
    });

    // B. & C. ACT & ASSERT (Esperamos que explote)
    await expect(loginUser({ email: 'x', password: 'y' }))
        .rejects
        .toThrow('Credenciales incorrectas');
  });
});