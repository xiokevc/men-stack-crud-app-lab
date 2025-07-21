// =================== Const ===================

const express = require('express');
const app = express ();

const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const Car = require('./models/Car');

// =================== Const ===================



// =================== Start ===================

app.listen(3000, () => {
    console.log('Listening on port 3000')
});