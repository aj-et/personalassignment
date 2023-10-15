const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Personal Project API',
        description: 'Users API',
    },
    host: 'personal-project-fdrz.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc)