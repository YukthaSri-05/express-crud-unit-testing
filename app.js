const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/DevOpsCse');

app.use('/data', require('./routes/marksRoutes'));

module.exports = app;
