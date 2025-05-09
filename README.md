# Activity Booking API

A RESTful API backend for a basic activity booking application.

## Features

- User registration and authentication using JWT
- List available activities (public endpoint)
- Book activities (authenticated users only)
- View user's bookings (authenticated users only)
- Cancel bookings

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT Token-based auth
- **Validation**: Express-validator

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login and get JWT token
- **GET /api/auth/me** - Get current user profile

### Activities

- **GET /api/activities** - Get all activities
- **GET /api/activities/:id** - Get a single activity by ID
- **POST /api/activities** - Create a new activity (admin only)

### Bookings

- **POST /api/bookings** - Book an activity
- **GET /api/bookings/my** - Get current user's bookings
- **PUT /api/bookings/:id/cancel** - Cancel a booking

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/activity-booking-api.git
   cd activity-booking-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/activity-booking-app
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   ```

4. Seed the database (optional):
   ```
   node seed.js
   ```

5. Start the server:
   ```
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## Usage with Postman

1. Import the Postman collection from the `postman` directory
2. Set up an environment with the following variables:
   - `baseUrl`: Your API URL (e.g., `http://localhost:5000`)
   - `authToken`: Will be automatically set after login

## API Documentation

### Register User

```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123"
}
```

### Login User

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Activities

```
GET /api/activities
```

### Book an Activity

```
POST /api/bookings
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "activityId": "activity_id_here"
}
```

### Get My Bookings

```
GET /api/bookings/my
Authorization: Bearer YOUR_JWT_TOKEN
```

## Deployment

This API can be deployed to platform:

- Vercel (https://vercel.com)


## License

MIT