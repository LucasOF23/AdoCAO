import request from 'supertest';
import express from 'express';
import SequelizeMock from 'sequelize-mock';
import ongController from './ong.controller.js';

// Mock Sequelize models
const DBConnectionMock = new SequelizeMock();
const OngMock = DBConnectionMock.define('Ong', {
  id: 1,
  name: 'Test ONG',
  address: '123 Test St',
  CityId: 1,
});
const CityMock = DBConnectionMock.define('City', {
  id: 1,
  name: 'Test City',
});

// Create an express app for testing
const app = express();
app.use(express.json());

// Define the routes for testing
app.get('/ongs', ongController.findAll);
app.get('/ongs/:id', ongController.findById);

// Mock the models and their methods inside the factory function
jest.mock('../models/ong.model.js', () => ({
  findAll: () => OngMock.findAll(),
  findByPk: id => OngMock.findByPk(id),
}));

jest.mock('../models/city.model.js', () => CityMock);

describe('ONG Controller', () => {
  describe('findAll', () => {
    it('should return all ONGs', async () => {
      const response = await request(app).get('/ongs');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{
        id: 1,
        name: 'Test ONG',
        address: '123 Test St',
        CityId: 1,
      }]);
    });
  });

  describe('findById', () => {
    it('should return a single ONG by ID', async () => {
      const response = await request(app).get('/ongs/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: 'Test ONG',
        address: '123 Test St',
        CityId: 1,
      });
    });

    it('should return 404 if ONG not found', async () => {
      OngMock.findByPk = jest.fn().mockResolvedValue(null);
      const response = await request(app).get('/ongs/999');
      expect(response.status).toBe(404);
    });
  });
});
