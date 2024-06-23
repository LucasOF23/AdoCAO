import request from 'supertest';
import express from 'express';
import SequelizeMock from 'sequelize-mock';
import userController from './user.controller.js';

// Mock Sequelize models
const mockDBConnection = new SequelizeMock();
const mockUserModel = mockDBConnection.define('User', {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  isSuperAdmin: false,
});
const mockContactInfoModel = mockDBConnection.define('ContactInfo', {
  email: 'test@example.com',
  instagramProfile: 'test_instagram',
  facebookProfile: 'test_facebook',
  telephoneNumber: '123456789',
  other: 'Other info',
});

// Create an express app for testing
const app = express();
app.use(express.json());

// Define the routes for testing
app.get('/users/:id', userController.findByPk);
app.put('/users/:id', userController.update);
app.put('/users/:id/contactinfo', userController.updateContactInfo);
app.put('/users/:id/adminstatus', userController.changeSuperAdminStatus);

// Mock the models and their methods inside the factory function
jest.mock('../models/user.model.js', () => ({
  findByPk: id => mockUserModel.findByPk(id),
  update: (data, options) => mockUserModel.update(data, options),
}));

jest.mock('../models/contactinfo.model.js', () => ({
  update: (data, options) => mockContactInfoModel.update(data, options),
}));

describe('User Controller', () => {
  describe('findByPk', () => {
    it('should return user by ID', async () => {
      const response = await request(app).get('/users/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        isSuperAdmin: false,
      });
    });

    it('should return 400 if no user ID is provided', async () => {
      const response = await request(app).get('/users/');
      expect(response.status).toBe(400);
      expect(response.text).toBe('Usuário não especificado.');
    });
  });

  describe('update', () => {
    it('should update user information', async () => {
      const response = await request(app).put('/users/1').send({ name: 'Updated User' });
      expect(response.status).toBe(200);
    });

    it('should return 403 if non-admin tries to update another user', async () => {
      const response = await request(app)
        .put('/users/2')
        .send({ name: 'Updated User' })
        .set('locals', { userId: 1, isSuperAdmin: false });
      expect(response.status).toBe(403);
      expect(response.text).toBe('Apenas super usuários podem editar outros.');
    });
  });

  describe('updateContactInfo', () => {
    it('should update user contact information', async () => {
      const response = await request(app).put('/users/1/contactinfo').send({ email: 'newemail@example.com' });
      expect(response.status).toBe(200);
    });

    it('should return 403 if non-admin tries to update another user\'s contact info', async () => {
      const response = await request(app)
        .put('/users/2/contactinfo')
        .send({ email: 'newemail@example.com' })
        .set('locals', { userId: 1, isSuperAdmin: false });
      expect(response.status).toBe(403);
      expect(response.text).toBe('Apenas super usuários podem editar outros.');
    });
  });

  describe('changeSuperAdminStatus', () => {
    it('should change user admin status', async () => {
      const response = await request(app)
        .put('/users/1/adminstatus')
        .send({ newStatus: true })
        .set('locals', { isSuperAdmin: true });
      expect(response.status).toBe(200);
    });

    it('should return 403 if non-admin tries to change admin status', async () => {
      const response = await request(app)
        .put('/users/1/adminstatus')
        .send({ newStatus: true })
        .set('locals', { isSuperAdmin: false });
      expect(response.status).toBe(403);
      expect(response.text).toBe('Usuário não é super usuário.');
    });

    it('should return 400 if status or user ID is not specified', async () => {
      const response = await request(app)
        .put('/users/1/adminstatus')
        .send({})
        .set('locals', { isSuperAdmin: true });
      expect(response.status).toBe(400);
      expect(response.text).toBe('Status ou usuário não especificados.');
    });
  });
});
