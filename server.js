const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectdb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const app = express();
connectdb();
const port = process.env.port || 5000;
app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
