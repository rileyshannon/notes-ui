# Notes App

A single-page application built with React and TypeScript, consuming the [Notes API](https://github.com/rileyshannon/notes-api). Built as a learning project to explore SPA authentication patterns with a Laravel backend.

## Stack

- React 19
- TypeScript
- Vite
- React Router v7
- Axios
- Tailwind CSS
- react-hot-toast

## Features

- Register and login with token-based authentication
- Create, edit, and delete notes
- Two-column layout with inline editing
- Protected routes — unauthenticated users are redirected to login
- Toast notifications for user feedback

## Getting Started

### Requirements

- Node.js 18+
- pnpm
- [Notes API](https://github.com/rileyshannon/notes-api) running locally

### Installation

```bash
git clone https://github.com/rileyshannon/notes-app.git
cd notes-app
pnpm install
pnpm dev
```

The app will be available at `http://localhost:5173`.

### API Configuration

The API base URL is configured in `src/lib/axios.ts`. By default it points to `http://notes-api.test/api`. Update this if your API is running on a different host or port.

## Project Structure

```
src/
├── lib/
│   └── axios.ts        # Axios instance with token interceptor
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Notes.tsx
└── App.tsx             # Route definitions and auth state
```

## Building for Production

```bash
pnpm build
```
