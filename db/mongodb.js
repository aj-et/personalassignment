const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv')
dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = { client, run, ObjectId };