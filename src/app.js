const express = require('express');

const authRoutes = require('./routes/authRoutes');
const jogosRoutes = require('./routes/jogosRoutes');
const palpitesRoutes = require('./routes/palpitesRoutes');

const app = express();

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', jogosRoutes);
app.use('/api', palpitesRoutes);

module.exports = app;
