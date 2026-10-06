# Supplemental Benefits - Health Gateway Demo

Multi-carrier demo for supplemental insurance benefits claim workflows powered by InterSystems HealthShare.

## Tech Stack

- Vite + React + TypeScript
- shadcn/ui + Tailwind CSS
- Vercel (deployment) with serverless API functions

## Local Development

```sh
# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..

# Create server/.env with HealthShare credentials
# HEALTHSHARE_BASE=<url>
# HEALTHSHARE_USERNAME=<user>
# HEALTHSHARE_PASSWORD=<pass>

# Start the backend (proxies to HealthShare)
cd server && npm run dev

# In a separate terminal, start the frontend
npm run dev
```

The frontend runs on `http://localhost:8080` and proxies `/api` requests to the backend on port 3000.

## Deployment

Each git branch represents a carrier-branded variant and is deployed to Vercel under its own URL. The `api/patient.js` serverless function handles HealthShare API calls in production.

## Branches

- `main` — base code
- `InterSystems-Mutual-NTT-Branding` — InterSystems Mutual branded demo
