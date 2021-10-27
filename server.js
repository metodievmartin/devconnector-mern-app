const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const path = require('path');

// Set ENV variables from config.env
dotenv.config({ path: './config.env' });

const app = express();

// Connect to the DataBase
const db = process.env.MONGO_URI;
connectDB(db);

// Initialize middleware
app.use(express.json({extended: false}));


// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));