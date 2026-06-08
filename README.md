# Google Doc Frontend

A React-based document editor frontend built with Create React App, Tailwind CSS, React Router, Tiptap, and Axios.

## Project Overview

This frontend provides an authenticated document editing experience similar to a lightweight Google Docs interface. Users can log in, view and manage their documents, edit content, upload files, share documents, and save changes automatically.

## Folder Structure

- `public/`
  - `index.html` — application shell and root markup
  - `manifest.json` — PWA metadata
  - `robots.txt` — crawler directives
- `src/`
  - `index.js` — React entry point
  - `App.js` — top-level route and layout setup
  - `App.css` / `index.css` — global styles
  - `reportWebVitals.js` — performance metrics helper
  - `setupTests.js` — test environment setup
  - `api/`
    - `axios.js` — shared Axios instance and API helpers
  - `components/`
    - `DeleteButton.jsx` — reusable delete action button
    - `EditorToolbar.jsx` — rich text editor toolbar controls
    - `Layout.jsx` — application page shell and navigation wrapper
    - `NewDocumentButton.jsx` — create new document button
    - `PrivateRoute.jsx` — route guard for authenticated views
    - `ShareModal.jsx` — document sharing modal dialog
    - `UploadButton.jsx` — file upload button component
  - `context/`
    - `AuthContext.jsx` — authentication and session state provider
  - `hooks/`
    - `useDocuments.js` — document list and editor state management
  - `pages/`
    - `DashboardPage.jsx` — document dashboard and list view
    - `EditorPage.jsx` — rich text editor and document editor page
    - `LoginPage.jsx` — user authentication page

## Key Features

- Authentication via `AuthContext`
- Protected routes using `PrivateRoute`
- Document listing, creation, editing, and deletion
- Rich text editing powered by Tiptap extensions
- Share modal for document collaboration actions
- File uploads through reusable upload button component
- Axios-based API requests configured in `src/api/axios.js`

## Development Workflow

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm start
```

Open `http://localhost:3000` to view the app. The app reloads automatically when files change.

### Run tests

```bash
npm test
```

### Build production bundle

```bash
npm run build
```

### Common workflow

1. Update or add UI in `src/components/` and `src/pages/`
2. Add shared logic in `src/hooks/` or `src/context/`
3. Use `src/api/axios.js` for backend API calls
4. Run `npm start` and verify behavior in the browser
5. Build with `npm run build` before deployment

## How the app works

1. User visits `LoginPage` and authenticates.
2. After login, the app redirects to `DashboardPage`.
3. The dashboard shows documents and lets users create, open, delete, or share them.
4. Opening a document navigates to `EditorPage`, where rich text editing is available.
5. Changes can be saved, shared, or uploaded from editor controls.

## Notes

- This app uses Tailwind CSS for styling.
- The editor uses `@tiptap/react` and editor extensions for formatting controls.
- React Router v6 handles app navigation.
- The frontend expects a backend API for authentication, document persistence, sharing, and uploads.
