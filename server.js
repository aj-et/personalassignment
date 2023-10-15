const express = require('express');
const cors = require('cors');
const mongodb = require('./db/mongodb');
const dotenv = require('dotenv')
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json()); // This will handle JSON requests

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'));

mongodb.run()

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 