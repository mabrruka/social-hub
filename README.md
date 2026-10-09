
# Social Hub

Social Hub is a social media website where users can create accounts, sign in, manage their profiles, and connect with others.

## Features

- User registration and login
- Secure password hashing
- User profiles
- Search page
- Create post page
- Notifications page
- Settings page
- MySQL database

## Technologies

- Next.js
- TypeScript
- Tailwind CSS
- Prisma ORM
- MySQL
- Docker

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/mabrruka/SocialHub.git
   ```

2. Navigate to the project:

   ```bash
   cd SocialHub
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure your `.env` file with your database connection and authentication secret.

5. Start the MySQL database:

   ```bash
   docker compose up -d
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.
