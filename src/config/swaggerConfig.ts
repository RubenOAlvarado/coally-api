import { SwaggerOptions } from "swagger-ui-express";

const swaggerOptions: SwaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
            description: 'A simple task manager API',
        },
        servers: [
            {
                url: process.env.API_URL 
                    ? `${process.env.API_URL}/api/v1` 
                    : 'http://localhost:3000/api/v1',
                description: process.env.API_URL
                    ? 'Deployed server'
                    : 'Development server',
            },
        ],
        components: {
            schemas: {
                Task: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Task id',
                        },
                        title: {
                            type: 'string',
                            description: 'Task title',
                        },
                        description: {
                            type: 'string',
                            description: 'Task description',
                        },
                        status: {
                            type: 'string',
                            description: 'Task status',
                        },
                        createdAt: {
                            type: 'string',
                            description: 'Task creation date',
                        },
                        updatedAt: {
                            type: 'string',
                            description: 'Task update date',
                        },
                    },
                },
                CreateTask: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Task title',
                        },
                        description: {
                            type: 'string',
                            description: 'Task description',
                        },
                    },
                    required: ['title'],
                },
            },
        },
    },
    apis: ['src/app/routes/*.ts', 'src/infrastructure/http/controllers/*.ts'],
};

export default swaggerOptions;