# Reno Platforms Notice Board — Web Development Assignment

A responsive, state-of-the-art Notice Board web application built with **Next.js (Pages Router)**, **Prisma ORM**, and **Tailwind CSS**, supporting end-to-end **Create, Read, Update, and Delete (CRUD)** operations with strict server-side validation and database-level priority sorting (`Urgent` notices appear first).

---

## 🚀 Features & Evaluation Criteria Handled

1. **Full CRUD via API Routes (`/api/notices`)**:
   - `GET /api/notices`: Fetches all notices sorted by priority (`Urgent` first) at the database query level (`Prisma orderBy`), followed by publication date descending.
   - `POST /api/notices`: Creates a new notice with robust server-side validation.
   - `GET /api/notices/[id]`: Retrieves a single notice by ID.
   - `PUT /api/notices/[id]`: Updates an existing notice with strict server-side validation.
   - `DELETE /api/notices/[id]`: Deletes a notice by ID after confirmation.

2. **Database-Level Urgent Sorting**:
   - Uses Prisma query ordering (`orderBy: [{ priority: "desc" }, { publishDate: "desc" }]`) so that `Urgent` notices always appear at the top regardless of date, complete with a prominent visual badge.

3. **Single Reusable Add / Edit Form**:
   - One component (`components/NoticeForm.js`) handles both creation (`/notice/new`) and editing (`/notice/[id]/edit`). When editing, it automatically loads with the notice's current values.

4. **Responsive & Modern Design**:
   - Beautiful responsive grid layout for desktop, tablet, and phone screens.
   - Category color-coding (`Exam`, `Event`, `General`).
   - Confirmation dialog before deleting any notice.

---

## 🛠 Required Tech Stack Used

- **Framework**: Next.js (Pages Router under `pages/`)
- **Database Access**: Prisma ORM (`@prisma/client`)
- **Database**: SQLite (default local development setup, easily swappable to MySQL / TiDB Cloud for Vercel deployment)
- **Styling**: Tailwind CSS v4

---

## 📦 How to Run the Project Locally

### Prerequisites
- **Node.js** v18+ installed on your system.

### Steps

1. **Clone or navigate to the repository folder**:
   ```bash
   cd notice-board
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set environment variables**:
   Create a `.env` file in the root directory (if not already present):
   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. **Push database schema & seed sample data**:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. Open your browser and visit **`http://localhost:3000`**.

---

## ☁️ Deploying to Vercel (Hosted Database Setup)

Because local SQLite files do not persist on Vercel's serverless filesystem, switch to a hosted database (such as **TiDB Cloud MySQL**, **Neon Postgres**, or **Supabase**) before deploying:

1. In `prisma/schema.prisma`, change the datasource provider:
   ```prisma
   datasource db {
     provider = "mysql" // Or "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. In Vercel Project Settings -> Environment Variables, add your hosted database connection string as `DATABASE_URL`.
3. Add a build script or automatic migration step in `package.json`:
   ```json
   "build": "prisma db push && next build"
   ```

---

## 💡 One Thing I Would Improve With More Time

With more time, I would implement:
- **Role-Based Access Control (RBAC) & Authentication**: Integrating **NextAuth.js** so that only authenticated faculty or administrators can create, edit, or delete notices, while students and visitors have read-only access with bookmarking and notification subscription features.
- **Rich Text & Attachment Uploads**: Adding a Markdown or rich-text editor (like Tiptap) for notice bodies and direct image/PDF attachment storage using AWS S3 or Cloudinary.

---

## 🤖 Where and How AI Was Used

AI (Google DeepMind Antigravity / Gemini) was used as an AI pair programmer during development for:
1. **Structuring boilerplate Next.js Pages Router & Prisma ORM code**: Generating clean API handlers (`pages/api/notices/index.js` and `pages/api/notices/[id].js`) with server-side validation rules and Prisma query syntax (`orderBy` urgent-first sorting).
2. **UI & Responsive Styling**: Creating visually polished Tailwind CSS components (`NoticeCard.js` and `NoticeForm.js`) with responsive card grids, urgent badges, and confirmation dialogs.
3. **Seeding & Documentation**: Writing realistic sample academic/campus notice seed data (`prisma/seed.js`) and drafting clear README documentation.
