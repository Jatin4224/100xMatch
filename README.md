# 100xMatch

A Tinder-style app for developers: browse profiles, mark people as **interested** or **ignored**, and when they accept your request you're connected.

- `Backend/` — Express + MongoDB (Mongoose) REST API with JWT cookie auth
- `frontend/frontend/` — React 18 + Vite, Redux Toolkit, React Router, Tailwind + daisyUI

## Getting started

Requirements: Node.js 18+ and a MongoDB instance (local or Atlas).

### Backend

```bash
cd Backend
cp .env.example .env   # then set MONGO_URL and JWT_SECRET
npm install
npm run dev            # http://localhost:3000
npm test               # API tests (no database needed)
```

| Variable | Description |
|---|---|
| `PORT` | Port to listen on (frontend expects `3000` by default) |
| `MONGO_URL` | MongoDB connection string (required) |
| `JWT_SECRET` | Secret used to sign login tokens (required) |
| `CLIENT_URL` | Allowed frontend origin(s), comma separated. Default `http://localhost:5173` |
| `NODE_ENV` | `production` makes the auth cookie `Secure` + `SameSite=None` (needs HTTPS) |

### Frontend

```bash
cd frontend/frontend
cp .env.example .env   # optional: VITE_API_URL, defaults to http://localhost:3000/api/v1
npm install
npm run dev            # http://localhost:5173
npm run lint
npm run build
```

## API

All routes are under `/api/v1`. Routes marked 🔒 need the `token` cookie set by signup/signin. Responses are JSON: `{ message?, data? }`.

| Method | Path | | Description |
|---|---|---|---|
| POST | `/signup` | | Create an account (`firstName`, `lastName`, `email`, `password`) and log in |
| POST | `/signin` | | Log in with `email` and `password` |
| POST | `/signout` | | Clear the auth cookie |
| GET | `/profile/view` | 🔒 | Current user |
| PATCH | `/profile/edit` | 🔒 | Update `firstName`, `lastName`, `about`, `age`, `gender`, `photoUrl`, `skills` |
| GET | `/feed?page=1&limit=10` | 🔒 | Users you haven't interacted with yet (max 50 per page) |
| POST | `/request/send/:status/:toUserId` | 🔒 | `status` is `interested` or `ignored` |
| POST | `/request/review/:status/:requestId` | 🔒 | Accept or reject a request sent to you (`accepted` / `rejected`) |
| GET | `/user/requests/received` | 🔒 | Pending `interested` requests sent to you |
| GET | `/user/connections` | 🔒 | Users you're connected with |

## Frontend pages

| Path | Page |
|---|---|
| `/` | Landing page |
| `/login`, `/signup` | Auth (logged-out only) |
| `/feed` | One profile at a time with Interested / Ignore |
| `/requests` | Accept or reject received requests |
| `/connections` | Your connections |
| `/profile` | Edit your profile with a live preview |
