
# Test Builder

## Description

This application will allow to create tests and quizes with the focus on multiple choice questions and save it to a PDF file.A user account can be created to store tests in the database.

### Front-end application

Created with Vite ( React+Typescript) Remote state is managed with Tanstack/React Query. Styling is managed with Material UI, Styled Components and basic CSS.

### Backend server

API created using Typescript, Express.js. and Mongoose to communicate with a MongoDB database.All the environmental variables for database managment and JWT token creation are supposed to be stored in a .env file(needs to be added manualy)

CRUD.md file explains all currently implemented routes.For testing the routes [Postman](https://www.postman.com/) is recommended.

## Installation

#### Prerequisites:

[Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/) need to be installed on your machine

1. Clone the repository:

   ```
   git clone https://github.com/MaciejPanasiuk/Test-Builder
   ```
2. Install app dependancies:

   ```
   npm install
   ```
3. Move to server directory:

   ```
   cd API
   ```
4. Install server dependancies:

   ```
   npm install
   ```

## Development

To start the development server in your localhost ( by default at `http://localhost:5173`), run:

```
npm run dev
```

Start the API by moving to the API directory (`cd API`) and running:

```
npm start
```

## Live demo

not yet implemented
