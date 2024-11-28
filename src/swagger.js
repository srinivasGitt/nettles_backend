// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Define the options for swagger-jsdoc
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Salesforce API',
            version: '1.0.0',
            description: 'This API allows interaction with Salesforce records like opportunities and contacts.',
            contact: {
                name: 'API Support',
                url: 'https://example.com/support',
                email: 'support@example.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
                description: 'Local server',
            },
        ],
    },
    apis: [`${__dirname}/controllers/salesforceController.js`],  // Path to the file containing Swagger annotations
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = {
    swaggerUi,
    swaggerSpec,
};
