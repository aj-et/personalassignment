const { client, ObjectId } = require('../db/mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv')
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const db = client.db('user'); // Database name
const collection = db.collection('userInfo'); // Collection name

const register = async (req, res) => {
    const user = {
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    };

    try {
        const result = await collection.insertOne(user);
        if (result) {
            const token = jwt.sign({ userId: result.insertedId }, jwtSecret, { expiresIn: '1h' });
            res.status(201).json({ token, message: 'User created successfully' });
        } else {
            res.status(500).send('Error creating user');
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await collection.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

module.exports = { register, login };