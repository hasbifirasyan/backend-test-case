// library-backend/swaggerDefinition.js

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
	openapi: '3.0.0',
	info: {
	  title: 'Library API',
	  version: '1.0.0',
	  description: 'Eigen Library API documentation using Swagger',
	},
	servers: [
	  {
		url: process.env.SERVER_URL || 'http://localhost:3000',
	  },
	],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

module.exports = swaggerJsdoc(options);