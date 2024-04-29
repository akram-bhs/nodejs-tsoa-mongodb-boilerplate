# Node.js TSOA MongoDB Boilerplate

This project is a boilerplate for building APIs using Node.js with TSOA (TypeScript OpenAPI) and MongoDB.

## Project Structure

```sh
├── dist # Compiled TypeScript files
├── node_modules # Node.js modules
├── public
│ ├── docs
│ │ ├── admin # Swagger documentation for admin API
│ │ │ └── swagger.json
│ │ └── customer # Swagger documentation for customer API
│ │ └── swagger.json
├── src
│ ├── config # Configuration files
│ │ ├── translations # Language translations
│ │ │ └── en.json
│ │ ├── tsoa admin.spec.json # TSOA spec for admin API
│ │ └── tsoa customer.spec.json # TSOA spec for customer API
│ ├── controllers # API controllers
│ │ ├── admin # Controllers for admin API
│ │ └── customer # Controllers for customer API
│ ├── data-access # Data access layer
│ │ ├── database # Database connection setup
│ │ │ └── connection.ts
│ │ ├── models # MongoDB models
│ │ └── repositories # Data access repositories
│ ├── dto # Data transfer objects
│ ├── middleware # Middleware functions
│ │ ├── auth.middleware.ts # Authentication middleware
│ │ ├── cache.middleware.ts # Cache middleware
│ │ ├── error.middleware.ts # Error handling middleware
│ │ ├── permission.middleware.ts # Permission checking middleware
│ │ └── validator.middleware.ts # Input validation middleware
│ ├── routes # Generated routes from TSOA
│ ├── services # Business logic services
│ ├── utils # Utility functions
│ ├── app.ts # Main application file
│ └── server.ts # Server setup
├── .env.example # Example environment variables file
├── .gitignore # Git ignore file
├── nodemon.json # Nodemon configuration file
├── package.json # Node.js dependencies and scripts
├── tsconfig.json # TypeScript configuration
```

## Getting Started

1. Clone this repository.
2. Install dependencies using `yarn install`.
3. Update environment variables in `.env.example` and rename it to `.env`.
4. Customize your API endpoints in `src/controllers`.
5. Run `yarn dev` to start the development server with hot reloading.
6. Access the Swagger documentation at `/docs` for both the admin and customer APIs.

## Additional Information

- TSOA: [https://github.com/lukeautry/tsoa](https://github.com/lukeautry/tsoa)
- MongoDB: [https://www.mongodb.com/](https://www.mongodb.com/)
