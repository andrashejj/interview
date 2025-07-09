# 📒 Address Book

A modern, type-safe address book built using **Next.js**, **Prisma**, **SQLite**, and **Tailwind CSS**. This app fetches user data from [https://dummyjson.com/users](https://dummyjson.com/users), seeds the database on first run (or every hour), and provides interactive filtering, sorting, and search functionality.

## 🚀 Features

* ✅ Fetches and persists user data from DummyJSON API using Prisma + SQLite
* ✅ Fully responsive, accessible UI built with Tailwind CSS
* ✅ Powerful filters: search by name/email, filter by gender, and sort by name or age
* ✅ Data seeded and cached for one hour to reduce API load
* ✅ Type-safe validation with Zod
* ✅ Clean project structure with separation of concerns
* ✅ Pagination support (client-side or server-side ready)
* ✅ Uses `next/font` for optimized custom fonts (Geist)

---

## 🛠 Tech Stack

* [Next.js 14+ (App Router)](https://nextjs.org/)
* [Prisma ORM](https://www.prisma.io/)
* [SQLite](https://www.sqlite.org/)
* [Zod](https://github.com/colinhacks/zod)
* [Tailwind CSS](https://tailwindcss.com/)
* [TypeScript](https://www.typescriptlang.org/)

---

## 📦 Getting Started
Here’s the updated **Getting Started** section with improved clarity and integration of the `.env` step:

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rajmendra/address-book.git
cd address-book
```

### 2. Install dependencies

```bash
npm install
# or use yarn or pnpm
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following content:

```env
NEXT_PUBLIC_DUMMY_USERS_API=https://dummyjson.com/users
```

> 💡 You can also run `cp .env.example .env` if an example file is provided.

### 4. Set up the database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

This will create your SQLite database and apply the initial migration.

### 5. Start the development server

```bash
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser to view the app.


---

## 📂 Project Structure

```
src/
├── app/               # Next.js App Router structure
│   ├── api/           # API Routes (e.g., /api/users)
│   └── page.tsx       # Main UI logic with filters and table
├── components/        # UI Components (SearchBar, UserTable, etc.)
├── lib/               # Utility functions (e.g., fetchDummyUsers, Prisma client)
├── prisma/            # Prisma schema and migrations
├── styles/            # Tailwind global styles
```

---

## ✨ Advanced Functionality

* 🕐 **Data Re-seeding**: App fetches new user data if more than one hour has passed since last seed.
* ✅ **Filtering & Sorting**: Built-in support to refine user list by various criteria.
* 📤 **Scalable**: Easily extendable to support more features (e.g. pagination, authentication).

---

## 🧪 Testing & Quality

* Type-safe API validation using **Zod**
* Custom Prisma types via generated client
* Designed with separation of concerns and modularity

---

## 🌐 Deployment

You can deploy this app instantly to [Vercel](https://vercel.com/) by clicking the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

For other deployment options, refer to the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 🧠 Learn More

* [Next.js Docs](https://nextjs.org/docs)
* [Prisma Docs](https://www.prisma.io/docs/)
* [Zod Docs](https://zod.dev/)
* [Tailwind Docs](https://tailwindcss.com/docs)

---

## 📌 Credits

Built by **Rajmendra** using modern web technologies. Inspired by real-world frontend interview tasks.

