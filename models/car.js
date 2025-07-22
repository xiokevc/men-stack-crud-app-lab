const mongoose = require('mongoose');

// Define car schema with make, model, year, and image fields
const carSchema = new mongoose.Schema({
  make: { 
    type: String, 
    required: true 
  },
  model: { 
    type: String, 
    required: true 
  },
  year: Number,
  image: String
});

// Create car model from schema
const car = mongoose.model('car', carSchema);

module.exports = car;
