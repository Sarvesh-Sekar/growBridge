const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// ✅ Add matchmaking route here
const matchRoutes = require('./routes/matchRoutes');
app.use('/api/matchmaking', matchRoutes);

app.get('/', (req, res) => {
  res.send('GrowBridge Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
