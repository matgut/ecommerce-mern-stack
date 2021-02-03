const express = require('express');
const app = express();
const config = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoute');
const categoryRoutes = require('./routes/categoryRoutes');


//midleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/category',categoryRoutes);

app.set('port', config.port);

module.exports = app;