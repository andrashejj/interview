# Interview Challenge: Address Book App

A T3 Stack Address Book application with interactive filtering, sorting, and search capabilities.


## Overview

Create an Address Book app that fetches user data from [dummyjson.com/users](https://dummyjson.com/users) with:
- Clean, structured layout
- Interactive filtering, sorting, and search
- Type safety and clean architecture

## Tech Stack

- **React** + **Next.js** + **TypeScript**
- **tRPC** + **Prisma** + **SQLite**
- **Tailwind CSS** + **Zod**

## Features

Paginated users list with search & multi-filter support  
Dynamic table columns based on active filters  
User detail pages with comprehensive information  
Todos drawer with full CRUD functionality  
Loading, error, and empty states  
Responsive design with smooth animations  

## Quick Start

```bash
git clone https://github.com/bigjoefilms/interview
cd interview
pnpm install
pnpm db:push
pnpm dev
```

Open <http://localhost:3000>

## Project Structure

```
src/
├── pages/           # Pages Router
├── _components/    # UI components
├── hooks/          # React Query hooks
├── server/api/     # tRPC routers
└── utils/          # Utilities
```

## ✅ What’s Completed

**Full application requirements** were met using a Test-Driven Development (TDD) workflow (with Vitest for unit/component tests). The result is a robust, type-safe, and responsive address book.

### Key Features Delivered
- **Search by name or email:** Smooth UX with a debounced search that reduces server/API calls.
- **Filter by gender:** Dropdown to filter users, showing all results for the selected gender.
- **Sort by Name, Age, or Email:** Sorting handled server-side for accuracy and efficiency.
- **SSR & Hydration:** Fast initial load and good SEO; static HTML rendered on server, then hydrated client-side.
- **Type safety:** End-to-end type checking enforced by Zod (schemas, procedures) and tRPC (API contracts).
- **Robust test coverage:** Every feature is covered by one or more tests, serving as living documentation.
- **Component architecture:** Logic/state (“container”) is kept separate from pure UI (“presentational”), supporting maintainability and reusability.

## 🧑‍💻 Professional Practices Employed
- **TDD (Test-Driven Development):** Wrote failing tests before implementing each feature, providing a roadmap, safety net, and clear documentation.
- **Clean architecture:** Consistent separation of concerns—API, container logic, presentational components, and utilities.
- **Type safety everywhere:** Zod, Prisma, and tRPC schemas/routers ensure type mismatches are caught at build time.

---

## 🚧 What Could Be Improved

- **Loading UX:** Replace the “Loading...” message with skeleton loaders or shimmer effects for smoother perceived performance during user/filters changes.
- **URL state:** Persist search/filter/sort in the URL using Next.js’s `useSearchParams` so refreshes and sharing links work as expected.
- **E2E Testing:** Add Playwright or Cypress for high-level, user-journey testing; currently strong component/unit coverage, but no end-to-end flows.
- **Advanced Filters:** Extend filter options (e.g., by university or department) to demonstrate architectural openness.
- **Better Feedback:** Implement inline error and success feedback, i.e. toasts/snackbars, on critical actions.

---

## 🟢 What Was Easy & Why

- **TDD workflow:** Clarity and structure—tests ⇒ requirements; made development predictable and refactoring safe.
- **Type safety:** Using tRPC/Zod/Prisma together guarantees types match from database to frontend.
- **Component separation:** “Smart” container and “dumb” presentational components kept logic and UI cleanly decoupled.

## 🟡 What Was Difficult & Why

- **Vitest/test environment setup:** Mocking the database layer and getting T3 Stack tools wired for safe client tests was complex but critical.
- **SSR/CSR hydration:** Ensured state (filters/sorting/pagination) synced and rehydrated correctly between server and client.
- **Async API boundaries:** Ensuring robust error handling, especially when integrating external APIs for seeding and test fixtures.

---

## 🚀 Next Steps With Time Estimates

1. **URL State Management (2–3h):** Sync component/search/filter state to the URL for shareability and reload persistence.
2. **Skeleton Loaders (~1h):** Polished loading state, visually matching the actual layout.
3. **More Filters (~1h):** Architecture enables quick new filter additions—just Zod schema, API router, and UI update.
4. **E2E Testing (3–6h):** Add Cypress/Playwright for top-level flows.
5. **Production DB Caching:** (If scaling up) Sync API data to local Prisma DB in background for speed/reliability—allows advanced queries and full control.

---

## 💡 What Would I Do Differently With More Time?

- **Automated API/database caching:** Instead of a pure “proxy” architecture to the dummyjson.com live API, I’d run a sync job to keep a local, indexed DB, drastically improving reliability, query flexibility, and app speed.
- **CI/CD with tests:** Add a pipeline so code is only deployed if it passes all tests.
- **Mobile-first & accessibility polish:** More focus on ARIA/patterns, color contrast, and keyboard/reader support.
- **Full Storybook coverage:** Build and document every UI piece for design system reusability.

---

## ⚠️ Production Database Notice

> **This project uses SQLite (`db.sqlite`) for local development, which is simple and fast. However, SQLite does _not_ work on Vercel and most other serverless platforms due to their read-only, ephemeral file systems.**
>
> **For production deployment you MUST switch to a hosted PostgreSQL database** (such as Neon, Supabase, Railway, or Vercel Postgres):
>
> 1. Change `provider = "postgresql"` in `prisma/schema.prisma`.
> 2. Set the `DATABASE_URL` environment variable to your hosted PostgreSQL connection string.
> 3. Run `pnpm db:push` (and optionally `pnpm db:seed`) to initialize the cloud database.
>
> _Your application will **fail to write/read** from SQLite in serverless production. Use Postgres for production reliability._

##  What's Missing or Could Be Improved

-  **Testing**: No unit, integration, or E2E tests
-  **User Editing**: No ability to edit user information
-  **Bulk Operations**: No bulk todo operations
-  **Export Functionality**: No CSV/JSON export
-  **Mobile Optimization**: Table could be better for mobile
-  **Accessibility**: Could improve ARIA labels and keyboard navigation

## 🎯 What Was Easy or Difficult

### Easy
- **Component Structure**: Modular design made navigation easy
- **Type Safety**: tRPC + Prisma provided excellent type inference
- **React Query**: Seamless caching and invalidation
- **Tailwind CSS**: Fast styling with utility classes

### Difficult
- **Prisma Cache Issues**: Permission errors on macOS requiring workarounds
- **Dynamic Table Columns**: Complex state management for conditional rendering
- **URL State Management**: Syncing query params without unnecessary re-renders
- **Optimistic Updates**: Ensuring cache consistency with rollbacks

## 🚀 Next Steps

### Immediate (1-2 weeks)
1. **Add Unit Tests** (8-12 hours) - Jest + React Testing Library
2. **Fix Mobile Experience** (4-6 hours) - Card-based mobile view
3. **Performance Optimization** (4-6 hours) - Virtual scrolling, bundle analysis

### Short-term (2-4 weeks)
4. **E2E Testing** (8-12 hours) - Playwright/Cypress setup
5. **User Editing Features** (6-8 hours) - Form validation, permissions
6. **Export Functionality** (3-4 hours) - CSV/JSON export

### Long-term (2-3 months)
7. **Advanced Features** (12-16 hours) - Auth, saved filters, regex search
8. **Complete Documentation** (8-10 hours) - API docs, Storybook
9. **Security Enhancements** (6-8 hours) - Rate limiting, CSRF protection

## 💡 What I'd Do Differently with More Time

1. **Testing First**: Implement TDD from the beginning
2. **Component Library**: Create Storybook documentation
3. **Accessibility**: Implement ARIA patterns and keyboard navigation
4. **Mobile-First**: Design mobile experience first, then enhance for desktop
5. **CI/CD Pipeline**: Set up automated testing and deployment early
6. **Error Tracking**: Add comprehensive error monitoring with Sentry

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run tests with Jest
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm db:seed` - Seed the database
- `pnpm db:studio` - Open Prisma Studio
