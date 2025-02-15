# Flashcard App

A web-based flashcard application that helps users learn and review concepts efficiently. Users can flip flashcards to see answers, mark their answers as correct or incorrect, and track progress in real time.

## Features

- Create and manage flashcards
- Flip cards to reveal answers
- Mark answers as correct or incorrect
- Real-time UI updates
- Authentication system
- Responsive design

## Tech Stack

- **Frontend:** React, Redux, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT)

## Installation

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/flashcard-app.git
   cd flashcard-app/server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` folder with the following variables:

   ```env
   MONGODB_URL=your_mongodb_connection_string
   PORT=4000
   MAIL_HOST=your_mail_host
   MAIL_USER=your_mail_user
   MAIL_PASS=your_mail_password
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `src` folder with the following variable:

   ```env
   REACT_APP_BASE_URL=http://localhost:4000/api/v1/
   ```

4. Start the development server:

   ```bash
   npm start
   ```

## Usage

- Register/Login to your account
- Start reviewing flashcards
- Click the `Reveal Answer` button to flip the card
- Mark whether you got the answer right or wrong
- The next card updates in real time

## License

This project is licensed under the MIT License.

