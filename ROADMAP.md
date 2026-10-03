# Roadmap

Features and improvements that contributors can build. Each item has a difficulty, the area of the code it touches, and hints on where to start.

**Want one?** Find or open an issue for it and comment that you're taking it, so nobody duplicates the work. For 🔴 items, share a short plan in the issue before you start coding.

**Difficulty:** 🟢 Easy (a few hours, good first issue) · 🟡 Medium (a day or two) · 🔴 Hard (a bigger feature, may need design discussion)

---

## 💘 Matching and feed

### 🟢 "Undo" the last swipe
Let users take back their last Nope or Interested within a few seconds.
- **Frontend:** keep the last swiped user in `Feed.jsx` and show an Undo button.
- **Backend:** add `DELETE /request/:requestId` that only lets the sender delete their own request, and only while it's not yet accepted.

### 🟢 Show how many profiles are left
The feed loads 10 at a time and refetches when they run out. Add a total count to the `/feed` response and show it.

### 🟡 Feed filters
Filter the feed by skill, age range or gender.
- **Backend:** accept query params on `GET /feed` (e.g. `?skills=react,rust&minAge=20`). Validate them with zod and add them to the `User.find()` filter in `routes/user.js`.
- **Frontend:** a filter panel above the card in `Feed.jsx`. Clear the stored feed when the filters change.

### 🟡 Swipe gestures
Drag the card left or right (on mobile and desktop) instead of only clicking. framer-motion's `drag="x"` and `onDragEnd` are already available.

### 🔴 Smarter matching
Order the feed by compatibility instead of database order, for example shared skills first and then recently active users. This needs a MongoDB aggregation pipeline in `GET /feed`, plus tests.

### 🔴 Daily swipe limit
Limit how many requests a user can send per day, and show "come back tomorrow" when they hit it.

---

## 💌 Requests and matches

### 🟢 Sent requests page
Users can't see who they've shown interest in.
- **Backend:** add `GET /user/requests/sent` (status `interested`, `fromUserId` = me, populate `toUserId` with `USER_SAFE_DATA`).
- **Frontend:** a new tab or page that lists them, built from the same pieces as `Requests.jsx`.

### 🟢 Pending-request badge
Show the number of pending requests on the navbar's Requests link. You can reuse `GET /user/requests/received` or add a lightweight count endpoint.

### 🟢 "It's a match!" celebration
When someone accepts your request, or you accept theirs, show a fun animated modal. framer-motion and the doodles in `Doodles.jsx` are available.

### 🟡 Cancel a sent request / unmatch
- Let the sender delete a request that's still pending.
- Let either side remove an accepted connection, with a confirmation dialog.

### 🟡 View a match's full profile
Add `/profile/:userId`, visible only if you're connected to that user (check on the backend), with a bigger card, skills and links.

---

## 💬 Chat

### 🔴 Real-time chat between matches
This is the most requested feature.
- **Backend:**
  - Add `socket.io` to the Express server.
  - Add a `Message` model (`fromUserId`, `toUserId`, `text`, timestamps).
  - Only allow chat between accepted connections. Check this on the server.
  - Authenticate sockets with the same JWT cookie.
- **Frontend:**
  - Add a `/chat/:userId` page with a message list and an input.
  - Add a "Message" button on each match.
  - Load history with `GET /chat/:userId?before=<id>`, paginated.
- **Stretch goals:** typing indicator, unread counts, online status.

---

## 👤 Profiles and accounts

### 🟢 Profile links
Add optional `githubUrl`, `linkedinUrl` and `portfolioUrl` fields. Validate them as URLs in `validate.js`, add them to `USER_SAFE_DATA`, the editor and the card.

### 🟢 Character counter on the bio
Show `123/500` under the About textarea in `EditProfile.jsx`.

### 🟡 Photo upload
Replace the photo URL field with a real upload. Use Cloudinary or S3, upload from the backend with `multer`, and store the resulting URL in `photoUrl`. Limit the file type and size.

### 🟡 Change password
Add `PATCH /profile/password`, which needs the current password and a new one that passes the signup password rules. Add a form for it on the profile page.

### 🟡 Forgot password
Email a one-time reset link (Nodemailer or Resend). Store a hashed token with an expiry on the user, and add a reset page.

### 🟡 Email verification
Send a verification email at signup. Only verified users appear in the feed.

### 🔴 Log in with GitHub
OAuth login with GitHub. Pre-fill the name, photo and top languages from the GitHub API, and show a GitHub stats card on the profile.

### 🟡 Delete account
Delete the user and their requests, with a confirmation step.

---

## 🛡️ Safety

### 🟡 Block and report
- Blocked users never see each other in the feed, requests or matches.
- Reports are stored for a maintainer to review.

### 🟢 Rate limiting
Add `express-rate-limit` to `/signin` and `/signup`, and a looser limit on everything else.

### 🟢 Security headers
Add `helmet` to `app.js`.

---

## 🎨 Design and frontend

### 🟢 Light theme toggle
Add a second daisyUI theme (e.g. pink on white) in `tailwind.config.js` and a toggle in the navbar. Remember the choice in `localStorage`.

### 🟢 Skeleton loaders
Replace the spinner with card-shaped placeholders while the feed, requests and matches load.

### 🟢 Toast notifications
Show short pop-ups for "Request sent", "Profile saved" and errors, instead of inline text.

### 🟡 Accessibility pass
Check keyboard navigation, focus rings, color contrast and screen-reader labels on every page. Fix what you find and list it in the PR.

### 🟡 Onboarding flow
After signup, walk new users through photo → skills → bio in a few cute steps, instead of dropping them on the full profile form.

---

## 🧪 Testing and tooling

### 🟢 Frontend tests
Set up Vitest + React Testing Library in `frontend/frontend`, with first tests for `UserCard`, `Login` and the route guards.

### 🟡 End-to-end tests
Add Playwright tests for signup → edit profile → feed → requests → matches, with the API mocked or run against a test database.

### 🟡 Seed script
Add `npm run seed` in `Backend/` to create about 20 fake developer profiles (e.g. with `@faker-js/faker`) and some requests, so contributors can try the app without making accounts by hand.

### 🟡 Docker setup
Add a `docker-compose.yml` that starts MongoDB, the backend and the frontend with one command.

### 🟢 Prettier and pre-commit hooks
Add Prettier, plus `husky` and `lint-staged`, so code is formatted the same way automatically.

### 🔴 TypeScript migration
Convert the frontend, then the backend, to TypeScript, one file at a time. Discuss the plan in an issue first.

---

## 🚀 Deployment

### 🟡 Deploy guide
Write `docs/deploy.md` covering the frontend on Vercel or Netlify, the backend on Render or Railway, and the database on MongoDB Atlas. Include the production environment variables (`NODE_ENV=production`, `CLIENT_URL`, `VITE_API_URL`) and the HTTPS cookie requirement.

### 🟡 Paginate the feed by cursor
`skip()` gets slow as the user count grows. Switch to cursor-based pagination and add indexes for the feed and request queries.

---

Have an idea that isn't here? [Open a feature request](https://github.com/Jatin4224/100-x-Match/issues/new?template=feature_request.md). 💡
