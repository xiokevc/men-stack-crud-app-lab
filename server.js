// =================== Const ===================
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const car = require('./models/car.js');

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

// Root redirect to cars index
app.get('/', (req, res) => {
  res.redirect('/cars');
});


// Index - list all cars
app.get('/cars', async (req, res) => {
  const cars = await car.find();
  res.render('index.ejs', { cars });
});

// New - form to create a new car
app.get('/cars/new', (req, res) => {
  res.render('new.ejs');
});

// Create - add new car to database
app.post('/cars', async (req, res) => {
  await car.create(req.body);
  res.redirect('/cars');
});

// Show - show details about one car
app.get('/cars/:id', async (req, res) => {
  const oneCar = await car.findById(req.params.id);
  res.render('show.ejs', { car: oneCar });
});

// Edit - form to edit existing car
app.get('/cars/:id/edit', async (req, res) => {
  const oneCar = await car.findById(req.params.id);
  res.render('edit.ejs', { car: oneCar });
});

// Update - update car info in database
app.put('/cars/:id', async (req, res) => {
  await car.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/cars/${req.params.id}`);
});

// Delete - remove car from database
app.delete('/cars/:id', async (req, res) => {
  await car.findByIdAndDelete(req.params.id);
  res.redirect('/cars');
});

// =================== Start ===================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
