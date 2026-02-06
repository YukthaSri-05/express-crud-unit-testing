const express = require('express');
const router = express.Router();
const Marks = require('../models/marks');

/**
 * INSERT (API)
 */
router.post('/', async (req, res) => {
  try {
    const data = new Marks(req.body);
    await data.save();
    res.status(201).send("Inserted");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

/**
 * READ (JSON – for tests)
 */
router.get('/', async (req, res) => {
  try {
    const data = await Marks.find().sort({ marks: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * READ (PUG – for UI)
 * URL: http://localhost:2000/data/view
 */
router.get('/view', async (req, res) => {
  try {
    const data = await Marks.find().sort({ marks: -1 });
    res.render('sample', { data });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * UPDATE
 */
router.put('/:id', async (req, res) => {
  try {
    const numericId = Number(req.params.id);
    if (isNaN(numericId)) return res.status(400).send("Invalid ID");

    const updated = await Marks.findOneAndUpdate(
      { id: numericId },
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updated ? "Updated" : "Record not found");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

/**
 * DELETE
 */
router.delete('/:id', async (req, res) => {
  try {
    const numericId = Number(req.params.id);
    if (isNaN(numericId)) return res.status(400).send("Invalid ID");

    const deleted = await Marks.findOneAndDelete({ id: numericId });
    res.status(200).send(deleted ? "Deleted" : "Record not found");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
