# Contributing to 100xMatch

Thanks for helping out! 💘 This guide covers everything from setting up the project to getting your pull request merged. If anything here is unclear, open an issue. Improving this guide counts as a contribution too.

## Table of contents

- [Ways to contribute](#ways-to-contribute)
- [Before you start](#before-you-start)
- [Set up the project](#set-up-the-project)
- [Development workflow](#development-workflow)
- [Code style](#code-style)
- [Backend guide](#backend-guide)
- [Frontend guide](#frontend-guide)
- [Testing](#testing)
- [Commit messages](#commit-messages)
- [Pull request checklist](#pull-request-checklist)
- [Issue labels](#issue-labels)
- [Getting help](#getting-help)

## Ways to contribute

- **Fix a bug** from the [issue list](https://github.com/Jatin4224/100-x-Match/issues)
- **Build a feature** from [ROADMAP.md](ROADMAP.md)
- **Write tests:** the backend has an API suite, and the frontend has none yet
- **Improve the docs:** README, this guide, code comments
- **Design:** UI polish, accessibility, animations, mobile layout
- **Review pull requests** and try them locally

## Before you start

1. **Look for an existing issue.** If there isn't one, open one describing what you want to do.
2. **Comment on the issue** to say you're taking it, so two people don't build the same thing. A maintainer will assign it to you.
3. **For big changes** (a new page, a new model, a new dependency), describe your plan in the issue first and wait for a 👍. That saves you from rewriting a PR later.
4. **Keep one PR to one change.** Small PRs get reviewed and merged much faster.

New to open source? Issues labeled `good first issue` are small, well described and a good way in.

## Set up the project

You need Node.js 18+, Git, and a MongoDB database (a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster works well).

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/<your-username>/100-x-Match.git
cd 100-x-Match
git remote add upstream https://github.com/Jatin4224/100-x-Match.git

# 2. Backend (terminal 1)
cd Backend
cp .env.example .env        # set MONGO_URL and JWT_SECRET
npm install
npm run dev                 # http://localhost:3000

# 3. Frontend (terminal 2)
cd frontend/frontend
npm install
npm run dev                 # http://localhost:5173
```

**Tip:** to test matching you need at least two users. Sign up in a normal window and in a private window (or a second browser), then send requests between them.

### Common setup problems

| Problem | Fix |
|---|---|
| `Missing required environment variable: MONGO_URL` | Create `Backend/.env` from `.env.example` and fill it in |
| `Failed to start server: ... ECONNREFUSED` | MongoDB isn't running, or `MONGO_URL` is wrong. With Atlas, also allow your IP under *Network Access* |
| Logged out on every refresh / requests return 401 | The backend must run on the URL in `VITE_API_URL` (default `http://localhost:3000/api/v1`), and `CLIENT_URL` must match the frontend origin |
| CORS error in the browser console | Set `CLIENT_URL` in `Backend/.env` to the exact frontend URL, including the port |
| Port already in use | Change `PORT` in `Backend/.env` and `VITE_API_URL` in `frontend/frontend/.env` to match |

## Development workflow

```bash
# Always start from an up-to-date main
git checkout main
git pull upstream main

# Create a branch named after what you're doing
git checkout -b feat/sent-requests-page     # or fix/..., docs/..., refactor/..., test/...

# ...code...

# Run the checks (see "Pull request checklist")
# Commit and push to your fork
git push origin feat/sent-requests-page
```

Then open a pull request against `Jatin4224/100-x-Match:main` and fill in the template.

If `main` moves on while your PR is open, update your branch:

```bash
git fetch upstream
git merge upstream/main
```

## Code style

- **Match the code around you.** Same naming, same file layout, same amount of comments.
- **JavaScript only** (no TypeScript yet). The backend uses CommonJS (`require`) and the frontend uses ES modules (`import`).
- **Formatting:** 2-space indentation, double quotes, semicolons, trailing commas. If you use Prettier, the defaults match.
- **Names:** `camelCase` for variables and functions, `PascalCase` for React components and Mongoose models, `UPPER_SNAKE_CASE` for constants.
- **Comments explain why, not what.** Skip comments that just repeat the code.
- **No secrets in code.** Use environment variables and update `.env.example` when you add one.
- **No unused code.** Remove dead imports, `console.log` debugging and commented-out blocks before opening a PR.

## Backend guide

### Adding an endpoint

1. **Pick the router** in `Backend/src/routes/`, or create a new one and mount it in `src/app.js` under `/api/v1`.
2. **Protect it** with the `userAuth` middleware if it needs a logged-in user. You then get the user as `req.user`.
3. **Validate the input** with a zod schema in `src/utils/validate.js`. Never trust `req.body`, `req.params` or `req.query`. Check types, and use `mongoose.isValidObjectId()` for ids.
4. **Return JSON** shaped as `{ message?, data? }` with the right status code:

   | Status | When |
   |---|---|
   | 200 / 201 | Success / created |
   | 400 | Invalid input |
   | 401 | Not logged in, or bad token |
   | 404 | The thing doesn't exist (or isn't yours) |
   | 409 | Conflict, e.g. duplicate email |
   | 500 | Unexpected error. Log it and return a generic message |

5. **Add tests** in `Backend/test/`.
6. **Document it** in the README's API table.

### Security rules

- Never send the password hash. The User model hides it already. If you `select("+password")`, don't return that document.
- When returning other users, only select safe fields (see `USER_SAFE_DATA` in `routes/user.js`).
- Scope every query to the logged-in user when the data is private (e.g. `toUserId: req.user._id`).
- Don't send raw error messages from MongoDB or libraries to the client.

### Changing a model

Explain in your PR how existing data is affected. For example: a new required field breaks old documents, and a new unique index fails if duplicates exist.

## Frontend guide

### Adding a page

1. Create `frontend/frontend/src/components/MyPage.jsx`.
2. Add a route in `src/App.jsx`. Put it inside `<ProtectedRoute />` if it needs login, or inside `<GuestRoute />` if it's only for logged-out users.
3. Add a link to `NAV_LINKS` in `Navbar.jsx` if it belongs in the navigation.

### Talking to the API

Always use the shared axios instance. It already sends the login cookie:

```js
import api, { getErrorMessage } from "../utils/api";

try {
  const res = await api.get("/user/connections");
  setData(res.data.data);
} catch (err) {
  setError(getErrorMessage(err)); // shows the backend's message
}
```

Every page that loads data should handle three states: **loading** (`<Spinner />`), **error**, and **empty** (`<EmptyState />`), all from `Doodles.jsx`.

### State

- Use Redux (`src/utils/*Slice.js`) for data shared across pages: the user, feed, requests and connections.
- Use `useState` for anything local to one component, like form fields or a loading flag.
- If you add a slice, register it in `appStore.js`. It's reset on logout automatically.

### Styling

Use the theme's classes and colors instead of one-off styles, so the app keeps one look:

| Class | Use for |
|---|---|
| `card-pop` | Any card or panel |
| `btn-hot` / `btn-baby` / `btn-plain` | Main / secondary / neutral buttons |
| `input-pop` | Inputs, selects and textareas |
| `chip` | Tags, e.g. skills |
| `title-bubble` | Page headings |
| `scribble` | Handwritten-style subtitles |

Colors: `hot` (main pink), `baby` (light pink), `rose`, `night` (background), `ink` (text on light pink), `line` (borders). They're defined in `tailwind.config.js`. Use `text-ink` on light-pink backgrounds so text stays readable.

Also:

- Check your change at phone width (about 390px) as well as desktop.
- Keep it accessible: real `<button>`s and `<label>`s, `alt` text on images, and an `aria-label` on icon-only buttons.

## Testing

```bash
# Backend API tests (no database needed: Mongoose calls are stubbed)
cd Backend && npm test

# Frontend checks
cd frontend/frontend && npm run lint && npm run build
```

- **Backend tests** live in `Backend/test/api.test.js` and use `node:test` + `supertest`. Copy an existing test as a template; the `query()` and `mock.method()` helpers show how to fake database results.
- **New backend behavior needs a test,** including at least one failure case (bad input, not logged in, someone else's data).
- **Frontend tests don't exist yet.** Setting up Vitest + React Testing Library is on the [roadmap](ROADMAP.md) and is a great contribution.
- **Before opening a PR, also click through your change in the browser.**

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short summary in the imperative>

feat: add sent requests page
fix: keep feed from refetching in a loop
docs: explain MongoDB Atlas setup
style: tighten spacing on mobile navbar
refactor: move request status checks into a helper
test: cover the review route's 404 case
chore: bump vite to 6.1
```

Keep the summary under about 70 characters. Use the body to explain why, if it isn't obvious.

## Pull request checklist

Before you open the PR, make sure that:

- [ ] The branch is up to date with `main`
- [ ] `cd Backend && npm test` passes
- [ ] `cd frontend/frontend && npm run lint && npm run build` passes
- [ ] New backend behavior has tests
- [ ] You tried the change in the browser, on desktop and phone width
- [ ] UI changes have before/after screenshots in the PR description
- [ ] New environment variables are in `.env.example` and the README
- [ ] New endpoints are in the README's API table
- [ ] The PR description links the issue (`Closes #123`)

A maintainer will review your PR, usually within a few days. Expect some comments; that's normal and nothing personal. Push follow-up commits to the same branch and the PR updates automatically.

## Issue labels

| Label | Meaning |
|---|---|
| `good first issue` | Small and well described, great for newcomers |
| `help wanted` | We'd love someone to pick this up |
| `bug` | Something is broken |
| `enhancement` | A new feature or improvement |
| `frontend` / `backend` | Which part of the code it touches |
| `design` | UI and UX work |
| `docs` | Documentation |

## Getting help

- Stuck on setup or an issue? Comment on the issue or open a new one with the `question` label.
- Working on something big? Open a draft PR early so we can give feedback while you build.

By contributing you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md), and that your contributions are licensed under the [MIT License](LICENSE).
