# Tacnique User Management

A polished React + Tailwind web application for managing users with a simulated backend API.

## Project Overview

This project demonstrates a user management application built with:

- React + TypeScript for UI and app logic
- Tailwind CSS for fast and responsive styling
- Vite for development and build tooling
- JSONPlaceholder `/users` endpoint as a mock REST API

### Core features

- Fetch user data from the API and display it in a table
- Add a new user via API POST request
- Edit an existing user via API PUT request
- Delete a user via API DELETE request
- Search, filter, sort, and paginate user data
- Responsive layout with modern UI cards and controls
- Form validation and API error handling
- Unit tests for validation and service methods

## Folder Structure

```
Tacnique/
├── src/
│   ├── components/          # Reusable UI components
│   ├── services/            # API interaction code
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Helper utilities, validation
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # App entry point
│   └── index.css            # Tailwind CSS and global styles
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Setup Instructions

### 1. Install dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Then open the local URL shown in the terminal.

### 3. Build for production

```bash
npm run build
```

### 4. Run unit tests

```bash
npm run test
```

## Live demo

You can view a deployed demo of this app at:

- https://tacnique-app.netlify.app/

## Key Files

- `src/App.tsx` — Main UI structure and app state
- `src/services/userService.ts` — API request methods using `fetch()`
- `src/utils/validation.ts` — Form validation utilities
- `src/components/` — Modular UI components for cards, table, pagination, filters, and forms
- `src/types/index.ts` — Shared TypeScript types for users and forms

## API Behavior

The app uses JSONPlaceholder for API calls, which means:

- `GET /users` returns a static list of users
- `POST /users` returns a simulated successful response
- `PUT /users/:id` returns a simulated successful update
- `DELETE /users/:id` returns a simulated delete success

Because JSONPlaceholder does not persist changes, added or updated users are maintained only in the app state.

## Notes

- The app handles failed API requests with user-facing error messages.
- Validation ensures the form fields are filled and email format is checked.
- The UI is styled in a clean purple theme and is responsive for desktop and mobile.

## Recommended Commands

- `npm install` — install dependencies
- `npm run dev` — run development server
- `npm run build` — create production build
- `npm run test` — execute unit tests

## Contact

If you want any improvements or need help understanding how a part of the app works, feel free to ask.
