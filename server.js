const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config/default');

// Connect to database
connectDB();

const PORT = config.port || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${config.environment} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});