const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017', {}
).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`App listening on localhost:${PORT}`));
}).catch((error) => {
  console.log('Error connecting to MongoDB', error);
});