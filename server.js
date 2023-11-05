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
// app.use('/auth', require('./routes/auth'));

// app.get('/register', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '/public/login.html');
// });

mongodb.run()

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 