# QueueCare — recovered demo frontend

This is a recovery of the frontend source that was non-empty in the uploaded QueueCare archive. It is a **demo/prototype**, not a complete production healthcare system.

## What works in this recovery
- React 18 + Vite frontend
- Staff dashboard, queue management, public queue display
- Fictional demo data and browser `localStorage` persistence

## Important limitations
- The uploaded archive's backend files and backend package manifest were empty; they are not included here.
- The surviving frontend stores data in the current browser only. It does not synchronize across users or devices and does not use a verified database.
- Authentication, authorization, server-side validation, audit logs, and production database integration are not available in this recovery.
- Do not enter real patient information or use this for clinical operations.

## Run locally
Requires Node.js 18+ and npm.

```bash
cd client
npm ci
npm run dev
```

## Build for deployment
```bash
cd client
npm ci
npm run build
```
The generated static site is in `client/dist`. For Vercel, import this GitHub repository and set **Root Directory** to `client`, **Build Command** to `npm run build`, and **Output Directory** to `dist`.

## GitHub
Create an empty repository on GitHub, then from this folder run:

```bash
git init
git add .
git status
git commit -m "Recover QueueCare demo frontend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/QueueCare.git
git push -u origin main
```
Replace `YOUR_USERNAME` with your GitHub username. Review `git status` before committing and never commit secrets or patient data.

## Next step for a full application
Rebuild the missing API and integrate a hosted database, authentication, role-based authorization, validation, audit logging, backups, and privacy/security controls before using real patient data.
