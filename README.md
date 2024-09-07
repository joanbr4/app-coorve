# A Marketing Web Page

A digital marketing page, powered by Google Docs.

## Contacting me

Love this app? Let me know by on my profile social medida. You'll also stay up to date with the latest features app via checking this side.

## Questions

If you have questions about how to get your copy of project up and running, just reach me out! I'll do our best to answer your questions.

## Development Workflow

1. Clone and `cd` into the repo:
   `git clone https://github.com/joanbr4/project-coorve.git && cd project-coorve`

2. From the Google API console, create or select a project, then create a OAuth2 Client as Web Application setting javascript origin [url](http://localhost:5173)
   and redirect uris as http://localhost:3000/api/v1/google/callback

3. Install dependencies:

server: `cd services && pnpm install`

client: `cd web && pnpm install`

4. Create a `.env` file at every subfolder, you have `.env.example` to look how should end up it, and example look like this:

```bash
# API RESEND EMAILS FOR TEST
API_KEY_RESEND=re_abcdEFG_abcdEFG_abcdEFG_abcdEFG

# FOLDER ID FROM GOOGLE DRIVE WHERE TO RETRIEVE ALL DATA, IN THIS CASE, FOLDER WHICH KEEP SHEETS DOCS, AND RETRIEVE THAT DATA
FOLDER_ID=0123456ABCDEF

API_STRIPE_TEST=sk_test_ABCDEabcdeABCDEFE2324234234234

TURSO_DATABASE_URL=libsql://coorveDB-[your_account].turso.io

TURSO_AUTH_TOKEN=eyabcDEeefrfasdf.eABCSDFWEFWEFWE232324234n0.ASDFASDF234234FEGWE4-O2323

FRONTEND_URL=http://localhost:5173

# GOOGLE OAUTH CREDENTIALS
GOOGLE_CLIENT_ID=123456-bacdfeg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=abcxyz12345
GOOGLE_REDIRECT_URIS=http://localhost:3000/api/v1/google/callback
```

Ensure you share your base driver or folder

5. Start the app:

server: `cd services && pnpm dev`

client : `cd web && pnpm dev`

OR:

Using docker we can ommit to many tappings from step 2 with just one script from root:

`docker compose up -d --build`

The app should now be running at `localhost:5173` in client side and `localhost:3000` in server side.

## Deploying the app

Wherever you deploy fullstack app, you'll likely want to setup a [Google service account](https://console.cloud.google.com/) and [Oauth 2.0 Client](https://developers.google.com/identity/protocols/OAuth2) Set up your service account with API access to Drive and Cloud Datastore.

### Using Vercel

Vercel is an amazing host platform that with its easily detections, smooth this fragile step. Had a particular configuration which you must to meet, related to `/api` endpoint, folder named `api` or `vercel.json`, just don't touch or do it to customize to you!

Must creat a url for your server side and client side with itsself env.

All env variable can be upload by its file `.env` in each project, easy does it!

### Using Docker

This full Stack app can be used as a base image for deployment using Docker. This allows you to automate building and deploying a custom version of each part of project during Docker's building phase.

In `Dockerfile` is where is define what to build and how, check it out!

In `.github` will find more workflows to build, deploy, check.

Be carefull and change your count_name

### Using Github Containers

It usual too, instead of creating a images of your app and store it in DockerHub, do it in Github, how is that possible??

Github is an amazing platform to store your app, versions and also, all images from Docker, its called Github Containers.

In `.github` will find more workflows to build, deploy, check.

## App structure

### Server

Named `services`, the main entry point to the app is `src/main.ts` or `api/index.ts` for vercel

This file contains the express server which will respond to requests for docs in the configured team drive or shared folder.

### Client

Named `web`, the main entry point to the app is `main.tsx`
