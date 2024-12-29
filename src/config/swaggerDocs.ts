import { Application } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerConfig';
import swaggerUi from 'swagger-ui-express';

const swaggerDocs = (app: Application): void => {
    const specs = swaggerJSDoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    console.log('Swagger docs running on http://localhost:3000/api-docs');
};

export default swaggerDocs;