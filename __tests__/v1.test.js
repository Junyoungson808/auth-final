'use strict';

const supertest = require('supertest');
const { server } = require('../src/server');
const { db } = require('../src/models');
const request = supertest(server);

beforeEach(async () => {
  await db.sync();
});

afterEach(async () => {
  await db.drop();
});

describe('V1 (Unauthenticated API) routes', () => {
  test('POST /api/v1/:model adds an item to the DB and returns an object with the added item', async () => {
    const newCoffee = {
      type: 'Americano',
      temp: 'Iced',
      size: 'large',
    };
    let response = await request.post('/api/v1/coffees').send(newCoffee);

    console.log('Response Body', response.body);
    expect(response.status).toEqual(201);
    expect(response.body.type).toEqual(newCoffee.type);
    expect(response.body.temp).toEqual(newCoffee.temp);
    expect(response.body.size).toEqual(newCoffee.size);
  });

  test('GET /api/v1/:model returns a list of :model items', async () => {
    let response = await request.get('/api/v1/coffees');

    console.log('Response Body', response.body);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  test('GET /api/v1/:model/ID returns a single item by ID', async () => {
    const newCoffee = {
      type: 'Americano',
      temp: 'Iced',
      size: 'large',
    };
    let response = await request.post('/api/v1/coffees').send(newCoffee);

    const { id } = response.body;
    response = await request.get(`/api/v1/coffees/${id}`);

    console.log('Response Body', response.body);
    expect(response.body.type).toEqual(newCoffee.type);
    expect(response.body.temp).toEqual(newCoffee.temp);
    expect(response.body.size).toEqual(newCoffee.size);
    expect(response.body.id).toEqual(id);
  });

  test('PUT /api/v1/:model/ID returns a single, updated item by ID', async () => {
    const newCoffee = {
      type: 'Americano',
      temp: 'Iced',
      size: 'large',
    };
    let response = await request.post('/api/v1/coffees').send(newCoffee);
    const { id } = response.body;

    console.log('Response Body', response.body);
    expect(response.body.type).toEqual(newCoffee.type);
    expect(response.body.temp).toEqual(newCoffee.temp);
    expect(response.body.size).toEqual(newCoffee.size);
    expect(response.body.id).toEqual(id);

    const newName = 'Latte';
    response = await request.put(`/api/v1/coffees/${id}`).send({
      ...newCoffee,
      name: newName,
    });

    console.log('Response Body', response.body);
    expect(response.body.type).toEqual(newName);
    expect(response.body.temp).toEqual(newCoffee.temp);
    expect(response.body.size).toEqual(newCoffee.size);
    expect(response.body.id).toEqual(id);
  });

  test('DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found', async () => {
    const newCoffee = {
      type: 'Americano',
      temp: 'Iced',
      size: 'large',
    };
    let response = await request.post('/api/v1/coffees').send(newCoffee);
    const { id } = response.body;

    // get to make sure it is there
    response = await request.get(`/api/v1/coffees/${id}`);
    expect(response.body.name).toEqual(newCoffee.name);

    response = await request.del(`/api/v1/coffees/${id}`);
    expect(response.body).toEqual(1);

    // get to make sure it's not there
    response = await request.get(`/api/v1/coffees/${id}`);
    expect(response.body).toEqual(null);
  });
});
