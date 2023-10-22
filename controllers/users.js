const { client, ObjectId } = require('../db/mongodb');
const bcrypt = require('bcrypt');

const db = client.db('user'); // Database name
const collection = db.collection('userInfo'); // Collection name

const dotenv = require('dotenv')
dotenv.config();

const API_KEY = process.env.API_KEY;

const getAll = async (req, res) => {
    const apiKey = req.header('apiKey');

    if (apiKey !== API_KEY) {
        return res.status(401).json({ error: 'Please enter a valid API key.' });
    }

    try {
        const user = await collection.find({}).toArray();
        res.json(user);
    } catch (error) {
        console.error('Error retrieving contacts:', error);
        res.status(500).send('Internal Server Error');
    }
}

const getSingle = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await collection.findOne({ _id: new ObjectId(userId) })
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).send('Internal Server Error');
    }
}

const createUser = async (req, res) => {
    const user = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: await bcrypt.hash(req.body.password, 10)
    };

    try {
        const result = await collection.insertOne(user);
        if (result) {
            // console.log(user._id)
            res.status(201).json({ _id: user._id, message: 'User created successfully' });
        } else {
            res.status(500).send('Error creating user');
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id); // Assuming the user ID is passed in the URL
    
    const user = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: await bcrypt.hash(req.body.password, 10)
    };

    try {
        const result = await collection.replaceOne(
            { _id: userId }, user
        );

        if (result) {
            res.status(204).header({ 'Custom-Message': 'User updated successfully' }).send();
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.id; // Assuming the user ID is passed in the URL

    try {
        const result = await collection.deleteOne({ _id: new ObjectId(userId) });
        if (result) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser }