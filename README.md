# Description

Backend API for Coally task manager.

MongoDB is running in the Atlas cloud service, so, you don't need to install it locally.

© Ruben Alvarado.

## Tech Stack
 - Node.js
    - Express.js
    - Mongoose
    - Express-validator
    - Swagger
    - Jest
 - Typescript
 - MongoDB

## How to run the app
1. Clone the repository
2. Run `npm install`
3. Set MONGODB_URI environment variable in .env file
4. Run `npm run start`
5. Open your browser and go to `http://localhost:3000/api-docs`
6. You can test the API using Swagger UI
7. You can also test the API using Postman or any other API testing tool
8. Run `npm run test` to run the tests (soon)
9. Run `npm run test:e2e` to run the e2e tests (soon)
10. Enjoy!

## Installation

```bash
$ npm run install
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Documentation

```bash
# Swagger UI
$ localhost:3000/api-docs

```

## API Endpoints

```bash
# Create task
$ POST /api/v1/tasks

# Get all tasks
$ GET /api/v1/tasks

# Get task by id
$ GET /api/v1/tasks/:id

# Update task by id
$ PUT /api/v1/tasks/:id

# Delete task by id
$ DELETE /api/v1/tasks/:id

# Complete task by id
$ PATCH /api/v1/tasks/:id/complete
```

## Deployed API

[Coally Task Manager API](https://coally-api-production.up.railway.app/api/v1)


## Stay in touch

- Author - [Ruben O. Alvarado](https://github.com/RubenOAlvarado)
- Instagram - [Ruben O. Alvarado](https://www.instagram.com/alvaradorubo/)
- Gitlab - [Munditoro](https://gitlab.com/Munditoro)

## License

UNLICENSED.