require('dotenv').config();

const { connectDB } = require('./src/config/db');
const { createApp } = require('./src/app');

const port = process.env.PORT || 3000;
const app = createApp();

async function start() {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error.message);
    process.exit(1);
  }
}

start();
