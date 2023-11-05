const express = require('express');
const cors = require('cors');
const mongodb = require('./db/mongodb');
const dotenv = require('dotenv')
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests from localhost
        if (!origin || origin === 'http://localhost:8080') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json()); // This will handle JSON requests

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'));

mongodb.run()

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 