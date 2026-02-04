import swaggerJsdoc from 'swagger-jsdoc';

const port = process.env.PORT || 5001;
const baseUrl = process.env.API_BASE_URL || `http://localhost:${port}/api/v1`;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MERN Auth & Tasks API',
      version: '1.0.0',
      description: 'REST API with JWT auth and role-based access. Tasks CRUD.',
    },
    servers: [
      { url: baseUrl, description: process.env.NODE_ENV === 'production' ? 'Production' : 'Development' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/v1/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
