import express, { Application } from 'express';
import Server from './app/server';
import { connectToDatabase } from './infrastructure/database/connection';
import dotenv from 'dotenv';

dotenv.config();

const startServer = async () => {
    try {
      const app: Application = express();
      const server = new Server(app);
      await connectToDatabase();
      const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
      app.listen(PORT, () => {
          console.log(`Server listening on port ${PORT}`);
      })
      .on('error', (err) => {
          console.error(err);
          process.exit(1);
      });
    } catch (error) {
      console.error('An error occurred while starting the server', error);
      process.exit(1);
    }
}

startServer();