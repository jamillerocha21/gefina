import supertest from 'supertest';
import {
    describe,
    expect,
    it
} from 'vitest';

import app from './app.ts';

describe( //agrupa um conjunto de teste
    'rotas de faturas',
    () => {
        it(
            'devolve a relação de faturas',
            async () => {
                const request = supertest(app);
                const response = await request.get('/api/invoices');

                expect(response.status).toBe(200);
                expect(Array.isArray(response.body)).toBe(true);
            }
        );
    }
 );