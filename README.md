# Admin Panel

A modern and efficient Admin Panel built using **Next.js**, **Tailwind CSS**, **shadcn/ui**, **Auth.js**, **Prisma ORM**, and **MongoDB**. This project is designed to provide an easy-to-use interface for managing application data with robust authentication and beautiful UI components.

## Features

- **Authentication**: Secure user authentication using Auth.js (Google, etc.).
- **Database Integration**: Prisma ORM connected to a MongoDB database.
- **Responsive Design**: Fully responsive UI styled with Tailwind CSS.
- **Component Library**: Beautiful, reusable components powered by shadcn/ui.
- **Scalable Architecture**: Organized codebase with scalability in mind.

## Tech Stack

- **Next.js**: Framework for server-rendered React applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **shadcn/ui**: Modern, accessible UI components.
- **Auth.js**: Authentication solution supporting various providers.
- **Prisma ORM**: Type-safe database client for MongoDB.
- **MongoDB**: NoSQL database for storing application data.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/admin-panel.git
   cd admin-panel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database-name>?retryWrites=true&w=majority
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   ```

4. Apply Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Folder Structure

```
├── prisma            # Prisma schema and migrations
├── public            # Static assets
├── src
│   ├── app          # Next.js app directory
│   ├── components   # Reusable components
│   ├── lib          # Helper functions and utilities
│   ├── pages        # Next.js pages (if using both app and pages routers)
│   ├── styles       # Global styles
│   ├── prisma       # Prisma client
│   └── middleware   # Middleware for authentication
├── .env.example      # Environment variable example file
├── next.config.js    # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
└── README.md         # Project documentation
```

## Commands

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run start`: Start the production server.
- `npx prisma studio`: Open Prisma Studio for database management.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Auth.js Documentation](https://authjs.dev/)
- [shadcn/ui Documentation](https://shadcn.dev/)
