const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());

app.use(express.json());
const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

const storeRoutes = require('./routes/storeRoutes');
app.use('/api/store', storeRoutes);

const medicineRoutes = require('./routes/medicineRoutes');
app.use('/api/medicine', medicineRoutes);


const stockRoutes = require('./routes/stockRoutes');
app.use('/api/stock', stockRoutes);

const searchRoutes = require('./routes/searchRoutes');
app.use('/api/search', searchRoutes);



mongoose.connect(process.env.DB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
