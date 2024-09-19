const request = require('supertest');
const app = require('./app'); // Adjust the path according to your app file

describe('API Tests', () => {
    let userId, leadId, proposalId, assignmentId, communicationId;

    // Users Tests
    describe('Users', () => {
        it('should create a user', async () => {
            const res = await request(app)
                .post('/api/users')
                .send({ name: 'John Doe', email: 'john@example.com' });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
            userId = res.body.id; // Save user ID for later use
        });

        it('should get all users', async () => {
            const res = await request(app).get('/api/users');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should get user by ID', async () => {
            const res = await request(app).get(`/api/users/${userId}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', userId);
        });

        it('should update a user', async () => {
            const res = await request(app)
                .put(`/api/users/${userId}`)
                .send({ name: 'Jane Doe' });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', 'Jane Doe');
        });

        it('should delete a user', async () => {
            const res = await request(app).delete(`/api/users/${userId}`);
            expect(res.status).toBe(204);
        });
    });

    // Leads Tests
    describe('Leads', () => {
        it('should create a lead', async () => {
            const res = await request(app)
                .post('/api/leads')
                .send({ title: 'Lead Title', status: 'Open' });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
            leadId = res.body.id;
        });

        it('should get all leads', async () => {
            const res = await request(app).get('/api/leads');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should get lead by ID', async () => {
            const res = await request(app).get(`/api/leads/${leadId}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', leadId);
        });

        it('should update a lead', async () => {
            const res = await request(app)
                .put(`/api/leads/${leadId}`)
                .send({ status: 'Closed' });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('status', 'Closed');
        });

        it('should delete a lead', async () => {
            const res = await request(app).delete(`/api/leads/${leadId}`);
            expect(res.status).toBe(204);
        });
    });

    // Proposals Tests
    describe('Proposals', () => {
        it('should create a proposal', async () => {
            const res = await request(app)
                .post('/api/proposals')
                .send({ title: 'Proposal Title', leadId });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
            proposalId = res.body.id;
        });

        it('should get all proposals', async () => {
            const res = await request(app).get('/api/proposals');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should get proposal by ID', async () => {
            const res = await request(app).get(`/api/proposals/${proposalId}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', proposalId);
        });

        it('should update a proposal', async () => {
            const res = await request(app)
                .put(`/api/proposals/${proposalId}`)
                .send({ title: 'Updated Proposal Title' });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title', 'Updated Proposal Title');
        });

        it('should delete a proposal', async () => {
            const res = await request(app).delete(`/api/proposals/${proposalId}`);
            expect(res.status).toBe(204);
        });
    });

    // Lead Assignments Tests
    describe('Lead Assignments', () => {
        it('should create a lead assignment', async () => {
            const res = await request(app)
                .post('/api/lead-assignments')
                .send({ leadId, userId });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
            assignmentId = res.body.id;
        });

        it('should get all lead assignments', async () => {
            const res = await request(app).get('/api/lead-assignments');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should get lead assignment by ID', async () => {
            const res = await request(app).get(`/api/lead-assignments/${assignmentId}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', assignmentId);
        });

        it('should update a lead assignment', async () => {
            const res = await request(app)
                .put(`/api/lead-assignments/${assignmentId}`)
                .send({ userId: 2 });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('userId', 2);
        });

        it('should delete a lead assignment', async () => {
            const res = await request(app).delete(`/api/lead-assignments/${assignmentId}`);
            expect(res.status).toBe(204);
        });
    });

    // Communications Tests
    describe('Communications', () => {
        it('should create a communication entry', async () => {
            const res = await request(app)
                .post('/api/communications')
                .send({ leadId, message: 'Hello' });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
            communicationId = res.body.id;
        });

        it('should get all communications', async () => {
            const res = await request(app).get('/api/communications');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should get communication by ID', async () => {
            const res = await request(app).get(`/api/communications/${communicationId}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', communicationId);
        });

        it('should update a communication entry', async () => {
            const res = await request(app)
                .put(`/api/communications/${communicationId}`)
                .send({ message: 'Updated message' });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Updated message');
        });

        it('should delete a communication entry', async () => {
            const res = await request(app).delete(`/api/communications/${communicationId}`);
            expect(res.status).toBe(204);
        });
    });
});
