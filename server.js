// =================== Const ===================
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Car = require('./models/Car');

const app = express();

// =================== Middleware ===================
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// =================== MongoDB Connection ===================
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
});

// =================== Routes ===================

// Index
app.get('/cars', async (req, res) => {
  const cars = await Car.find();
  res.render('index.ejs', { cars });
});

// New
app.get('/cars/new', (req, res) => {
  res.render('new.ejs');
});

// Create
app.post('/cars', async (req, res) => {
  await Car.create(req.body);
  res.redirect('/cars');
});

// Show
app.get('/cars/:id', async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.render('show.ejs', { car });
});

// Edit
app.get('/cars/:id/edit', async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.render('edit.ejs', { car });
});

// Update
app.put('/cars/:id', async (req, res) => {
  await Car.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/cars/${req.params.id}`);
});

// Delete
app.delete('/cars/:id', async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.redirect('/cars');
});

// =================== Start ===================
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
