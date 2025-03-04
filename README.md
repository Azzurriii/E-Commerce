# Ecommerce API

A robust e-commerce backend API built with Express.js, TypeScript, and MongoDB.

## Features

- 🔐 Authentication & Authorization with JWT
- 📦 Product Management
- 🛍️ Order Processing
- 🏷️ Coupon System
- 📝 Review System
- 🖼️ Image Upload with Cloudinary
- 📧 Email Queue System with Bull
- 📚 API Documentation with Swagger
- 🔄 Real-time Updates with Socket.io
- 💾 Redis Caching
- 🔒 Rate Limiting
- 🛡️ Security Features (Helmet, XSS Protection)

## Tech Stack

- Node.js & Express.js
- TypeScript
- MongoDB with Mongoose
- Redis
- Bull Queue
- Socket.io
- Swagger
- Cloudinary
- JWT Authentication
- Docker

## Prerequisites

- Node.js (v20 or higher)
- MongoDB
- Redis
- Docker (optional)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Azzurriii/E-Commerce.git
cd E-Commerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the `env` directory based on the environment (dev/prod):
```env
DB_URL=your_mongodb_url
REDIS_URL=your_redis_url
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

4. Run the development server:
```bash
npm run dev
```

## Docker Setup

Build and run the application using Docker:

```bash
docker build -t shopify-api .
docker run -p 8000:8000 shopify-api
```

## Available Scripts

- `npm run dev` - Start development server with data seeding
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run format` - Format code with Prettier and ESLint
- `npm test` - Run tests
- `npm run data:import:dev` - Import seed data (development)
- `npm run data:import:prod` - Import seed data (production)
- `npm run worker:email` - Start email worker

## API Documentation

Access the Swagger documentation at:
```
http://localhost:8000/docs
```

## Project Structure

```
src/
├── configs/         # Configuration files
├── constants/       # Constants and enums
├── controllers/     # Route controllers
├── handlers/        # Response and error handlers
├── interfaces/      # TypeScript interfaces
├── middlewares/    # Express middlewares
├── models/         # Mongoose models
├── queues/         # Bull queue definitions
├── router/         # Express routes
├── services/       # Business logic
├── socket/         # Socket.io handlers
├── utils/          # Utility functions
└── workers/        # Background workers
```

## Security Features

- API Key Authentication
- JWT Token Authentication
- Rate Limiting
- XSS Protection
- Helmet Security Headers
- Request Validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request