import { getMissions } from './mission.service';
import { describe, it, expect, vi, beforeEach } from 'vitest';
// Mock global de fetch
const fetchMock = vi.fn();
vi.stubGlobal('fetch', fetchMock);

describe('Mission Service', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });
    it('debería incluir el token en la cabecera Authorization', async () => {
        // 1. ARRANGE
        const fakeToken = 'secret-agent-token';
        const fakeMissions = [{ _id: '1', title: 'Misión Test' }];
        fetchMock.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(fakeMissions),
        });
        // 2. ACT
        const result = await getMissions(fakeToken);
        // 3. ASSERT
        // Verificamos no solo la URL, sino los headers
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/missions'), // URL
            expect.objectContaining({ // Opciones
                headers: {
                    "Authorization": `Bearer ${fakeToken}`
                }
            })
        );
        expect(result).toEqual(fakeMissions);
    });
    it('debería lanzar un error si la respuesta no es OK', async () => {
        fetchMock.mockResolvedValue({
            ok: false,
            status: 403 // Forbidden
        });
        await expect(getMissions('bad-token'))
            .rejects
            .toThrow('No se pudieron cargar las misiones');
    });
});