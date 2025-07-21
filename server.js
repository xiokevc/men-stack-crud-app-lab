// =================== Const ===================

const express = require('express');
const app = express ();

const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const Car = require('./models/Car');

dotenv.config();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// =================== Get ===================

// Index
app.get('/cars', async (req, res) => {
  const cars = await Car.find();
  res.render('index', { cars });
});

// =================== Start ===================

app.listen(3000, () => {
    console.log('Listening on port 3000')
});