const express = require('express');
const connectDB = require('./config/db');
const usersRoutes = require('./routes/api/users');
const profileRoutes = require('./routes/api/profile');
const postsRoutes = require('./routes/api/posts');
const authRoutes = require('./routes/api/auth');
const cors = require('cors');

const app = express();

// CONNECT DATABASE
connectDB();

// INIT MIDDLEWARE
app.use(express.json({ extended: false }));

app.use(cors());

// DEFINE ROUTES
app.use('/api/users', usersRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port: ', PORT));
