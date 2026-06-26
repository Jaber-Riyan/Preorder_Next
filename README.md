# Preorder Next

A Next.js preorder management app built with React, Prisma, SQLite, and Tailwind UI-styled components.

GitHub repository: https://github.com/Jaber-Riyan/Preorder_Next

## Project Overview

This repository provides a simple admin interface for managing preorder records. It includes:

- Create and edit preorder entries with loader support
- Paginated list view with status toggle and delete actions
- Prisma + SQLite backend via an API route
- Client-side state management and routing in a Next.js App Router setup

## Prerequisites

- Node.js 18+ installed
- npm, pnpm, or yarn available
- SQLite support (installed automatically with the project dependencies)

## Environment Variables

Create a `.env` file in the project root with the following value:

```bash
DATABASE_URL="file:./dev.db"
```

> This app uses Prisma with `@prisma/adapter-better-sqlite3` and expects `DATABASE_URL` to point to a local SQLite file.

## Local Setup

From the project root:

```bash
npm install
```

Generate Prisma client files:

```bash
npx prisma generate
```

Push the Prisma schema to the database:

```bash
npx prisma db push
```

Start the app in development mode:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Database Seeding

The project includes a seeder script (`prisma/seed.ts`) that populates the database with sample `Preorder` records for development and testing.

### Prerequisites

Make sure the database schema has been pushed:

```bash
npx prisma db push
```

### Run the Seeder

Via npm script:

```bash
npm run seed
```

Or via Prisma's built-in seed system:

```bash
npx prisma db seed
```

### What it Seeds

The seeder creates 5 sample preorder records with varied data:

- Different customer names (John Doe, Jane Smith, etc.)
- Various product quantities (1–5)
- Different date ranges and statuses (active / inactive)
- Some records include an `endsAt` date, others have it as `null`

### Reset and Re-seed

To wipe the database and seed fresh data:

```bash
npx prisma db push --force-reset
npm run seed
```

## Prisma Studio

To inspect the database using Prisma Studio:

```bash
npx prisma studio
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production app
- `npm run start` - Run the built production app
- `npm run lint` - Run ESLint

## Notes

- The database file is created automatically by Prisma when you run `npx prisma db push`.
- If you change the Prisma schema, rerun `npx prisma db push` and `npx prisma generate`.

## License

This project is available under the terms defined by the repository owner.
