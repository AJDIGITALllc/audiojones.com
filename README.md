# audiojones.com

This is the official repository for the audiojones.com website, a Next.js and Firebase-powered application for personal branding, podcast production, and AI marketing systems.

## Architecture Overview

The application is a modern web app built with the following technologies:

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Firebase (Authentication, Firestore, Storage, Functions)
- **Deployment:** Vercel

## Quickstart

To get the application running locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/audiojones.com.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env.local` file in the root of the project and add the necessary Firebase configuration.
4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Configuration

The application requires the following environment variables to be set:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- `GOOGLE_APPLICATION_CREDENTIALS_JSON`
- `WHOP_API_KEY`
- `WHOP_API_URL`

## Running Locally and via Docker

You can run the application locally using the `npm run dev` command. We do not currently have a Docker setup.

## Scripts and Common Tasks

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the code.

## Testing Strategy

We do not currently have a testing strategy in place.

## CI/CD Overview

We do not currently have a CI/CD pipeline in place.

## Module Map

- `src/app`: Contains the pages and API routes for the application.
- `src/components`: Contains the React components used throughout the application.
- `src/hooks`: Contains the custom React hooks used throughout the application.
- `src/lib`: Contains the client-side and server-side libraries.

## Observability

We do not currently have an observability solution in place.

## Security Notes

The application uses Firebase Authentication to secure user data. All API routes are protected and require a valid Firebase ID token.

## Release Process and Versioning

We do not currently have a release process or versioning strategy in place.

## Contributing, Code of Conduct, License

This is a private repository, so we are not accepting contributions at this time.

## FAQ and Troubleshooting

If you have any questions or issues, please contact the repository owner.
