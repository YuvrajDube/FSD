const express = require('express');
const morgan = require('morgan');
const path = require('path');

const studentRoutes = require('./routes/students');

function createApp() {
  const app = express();

  app.use(express.json());
  app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

  app.use('/api/students', studentRoutes);

  app.get('/api', (req, res) => {
    res.json({
      message: 'MongoDB CRUD API is running',
      endpoints: {
        students: '/api/students'
      }
    });
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  return app;
}

module.exports = { createApp };
