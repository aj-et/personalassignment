const express = require('express');
const cors = require('cors');
const mongodb = require('./db/mongodb');
const dotenv = require('dotenv')
const passport = require('passport');
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json()); // This will handle JSON requests

// start of passport session management
const session = require('express-session');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
// end of passport session management

// Start of passport

app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
require('./utils/passport');
// End of passport

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'));

mongodb.run()

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 