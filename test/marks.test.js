const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Marks = require('../models/marks');

let testId;

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Marks CRUD Operations', () => {

  it('should insert data', async () => {
    testId = Math.floor(Math.random() * 10000);

    const res = await request(app)
      .post('/data')
      .send({
        id: testId,
        name: "Yuktha",
        branch: "CSE",
        marks: 86,
        skills: ["Node", "Mongo"]
      });

    expect(res.statusCode).toBe(201);
    expect(res.text).toBe("Inserted");

    const record = await Marks.findOne({ id: testId });
    expect(record).not.toBeNull();
    expect(record.name).toBe("Yuktha");
    expect(record.marks).toBe(86);   // ✅ FIXED
  });

  it('should read data', async () => {
    const res = await request(app).get('/data');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    const found = res.body.find(item => item.id === testId);
    expect(found).toBeDefined();
    expect(found.name).toBe("Yuktha");
  });

  it('should update data', async () => {
    const res = await request(app)
      .put(`/data/${testId}`)
      .send({ marks: 98 });

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Updated");

    const updatedRecord = await Marks.findOne({ id: testId });
    expect(updatedRecord.marks).toBe(98);
  });

  it('should delete data', async () => {
    const res = await request(app)
      .delete(`/data/${testId}`);

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Deleted");

    const deletedRecord = await Marks.findOne({ id: testId });
    expect(deletedRecord).toBeNull();
  });

  // ✅ EXTRA TESTS FOR 100% COVERAGE
  it('should return 400 for invalid update id', async () => {
    const res = await request(app)
      .put('/data/abc')
      .send({ marks: 50 });

    expect(res.statusCode).toBe(400);
  });

  it('should return 400 for invalid delete id', async () => {
    const res = await request(app)
      .delete('/data/xyz');

    expect(res.statusCode).toBe(400);
  });

});
