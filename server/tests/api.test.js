const request = require('supertest');
const app = require('../src/app');

describe('API Endpoints', () => {
    it('should return 200 and a welcome message from root', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('ShopSmart Backend Service');
    });

    it('should return 200 and a health status from /api/health', async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('ok');
        expect(res.body.message).toBe('ShopSmart Backend is running');
        expect(res.body).toHaveProperty('timestamp');
    });
});
