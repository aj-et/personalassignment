const express = require('express');
const cors = require('cors');
const mongodb = require('./db/mongodb');
const dotenv = require('dotenv')
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: function (origin, callback) {

        const allowedOrigins = ['http://localhost:8080', 'https://personal-project-fdrz.onrender.com'];

        // Allow requests from localhost
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json()); // This will handle JSON requests

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'));

app.use('/auth', require('./routes/auth'));

mongodb.run()

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 