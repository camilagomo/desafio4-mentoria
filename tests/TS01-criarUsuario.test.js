const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/server');
const login = require('../fixtures/login.json');

describe('validar usuario', () => {
    let email;

    before(async function() {
        const response = await request(app)
            .post('/api/auth/register')
            .send(login);

        if (response.status === 409 && response.body.message === 'Email já cadastrado') {
            email = login.email; // Usar o email do fixture
        } else {
            expect(response.status).to.eq(201);
            email = response.body.user.email;
        }
    });

    it('validar usuario (status 200)', async () => {
        const response = await request(app)
            .get(`/api/auth/status/${email}`);

        expect(response.status).to.eq(200);
        expect(response.body.exists).to.eq(true);
    });

    it('entrada com number ao invés de string no input nome (status 400)', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ ...login, name: 1234 });

        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('Nome deve ser uma string não vazia');
    });

    it('criar usuario com email sem dominio (status 400)', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ ...login, email: 'reginaldo' });

        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('Formato de email inválido');
    });

    it('criar usuario com campo de senha com string vazia (status 400)', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ ...login, email: 'pedro@gmail.com.br', password: '' });

        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('Email, senha e nome são obrigatórios');
    });

    it('criar usuario com email ja cadastrado (status 409)', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send(login);

        expect(response.status).to.eq(409);
        expect(response.body.message).to.eq('Email já cadastrado');
    });
});