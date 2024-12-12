# Semester-Project-2

## Description
It's an auction house.


## Table of Contents

- [Environment Variables](#environment-variables)
- [Prerequisites](#prerequisites)
- [How to Run](#how-to-run)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Linting and Formatting](#linting-and-formatting)
- [Contributing](#contributing)
- [License](#license)

## Environment Variables

To run this project, you need to set the following environment variables in a `.env.local` file:

- `VITE_API_KEY` - Your API key for authentication.
- `VITE_NOROFF_API_BASE_URL` - Base URL for the Noroff API.

Example `.env.local` file:

```env
VITE_API_KEY=your_api_key
VITE_NOROFF_API_BASE_URL=https://yourapiurl.com
```

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version X or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## How to Run

1. Clone the repository

2. Install dependencies

```bash
  npm install
```

or

```bash
yarn install
```

3. Create a `.env.local` file and add the required environment variables (see [Environment Variables](#environment-variables)).

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the provided URL that shows up in vscode terminal

## Scripts

The following scripts are defined in package.json:

- `npm run dev` – Starts a development server with hot-reloading
- `npm run build` – Builds the project for production
- `npm run preview` – Previews the built production site locally
- `npm run lint` – Runs ESLint on source files
- `npm run format` – Runs Prettier to format your code
- `npm run test` – Placeholder for tests

## Dependencies

- Vite – Frontend build tool.
- Tailwind CSS – CSS framework.
- ESLint & Prettier – For linting and formatting.
- Husky & lint-staged – For pre-commit hooks and ensuring code quality.

- Refer to package.json for a full list of dependencies and their versions.

## Linting and Formatting

This project uses ESLint and Prettier to maintain a consistent code style. Linting and formatting are automatically applied.
