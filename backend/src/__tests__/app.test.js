import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('app', () => {
  it('returns health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
