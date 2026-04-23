# FeedbackApp — Server

REST API for FeedbackApp, a feedback board where users can submit posts, vote, and comment. Built as a portfolio project.

---

## Tech Stack

- Node.js 22 + Express 5 + TypeScript
- Prisma ORM with PostgreSQL
- JWT authentication (httpOnly cookies)
- bcryptjs for password hashing

---

## Features

- **Auth** — Register, login, `/me`. JWT stored in httpOnly cookie. No refresh tokens by design.
- **Posts** — CRUD for feedback posts with types (feature request, bug report, improvement), statuses, tags, and pinning. Voting is unique per user per post, enforced at the database level.
- **Comments** — Authenticated users can comment on any post.
- **Changelog** — Public versioned changelog. Admins can create, update, and delete entries.
- **Role-based access** — `isAdmin` flag on the user; admin-only routes are protected by middleware.

---

## Data Model

```
User           — id, name, email, passwordHash, isAdmin
Post           — id, title, description, type, status, pinned, voteCount, commentCount, tags, authorId
Comment        — id, body, postId, authorId
Vote           — id, postId, userId  (unique per user+post)
ChangelogEntry — id, version, title, body, date, isNew, isMinor, tags, linkedPosts
```

---

## API Routes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | — | Register a new user |
| POST | `/api/auth/login` | — | Login |
| GET | `/api/auth/me` | Cookie | Get current user |
| GET | `/api/posts` | — | List all posts |
| GET | `/api/posts/:id` | — | Get a single post |
| POST | `/api/posts` | Cookie | Create a post |
| PATCH | `/api/posts/:id` | Admin | Update a post |
| DELETE | `/api/posts/:id` | Admin | Delete a post |
| POST | `/api/posts/:id/vote` | Cookie | Toggle vote on a post |
| GET | `/api/posts/:id/comments` | — | Get comments |
| POST | `/api/posts/:id/comments` | Cookie | Add a comment |
| GET | `/api/changelog` | — | List changelog entries |
| GET | `/api/changelog/:id` | — | Get a changelog entry |
| POST | `/api/changelog` | Admin | Create a changelog entry |
| PATCH | `/api/changelog/:id` | Admin | Update a changelog entry |
| DELETE | `/api/changelog/:id` | Admin | Delete a changelog entry |

---

## Project Structure

```
src/
├── controllers/   # Route handlers
├── middleware/    # Auth (JWT), error handler
├── routes/        # Express routers
├── services/      # Database queries
├── types/         # Shared TypeScript types
└── utils/         # AppError, asyncWrapper
prisma/
└── schema.prisma
```

---

## Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL

### Setup

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL and JWT_SECRET
npx prisma migrate dev --name init
npm run dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `PORT` | Port to run the server on (default: 3000) |

---

## Notes

This is a portfolio project. Intentional simplifications:

- No refresh token rotation — a single JWT is issued on login
- No email verification
- No pagination
