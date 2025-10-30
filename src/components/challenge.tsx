"use client";

import React from "react";

type CheckboxProps = {
  label?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

const Checkbox = ({
  label,
  checked = false,
  disabled = true,
  id,
  className = "",
  children,
}: CheckboxProps) => (
  <div className={`mb-1 flex w-full items-start gap-2 ${className}`}>
    <span className="relative mt-1">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="peer relative mt-0.5 h-5 w-5 shrink-0 appearance-none rounded-sm border-2 border-blue-200 bg-white checked:border-blue-500 checked:bg-blue-500 focus:ring-1 focus:ring-blue-100 focus:ring-offset-0 focus:outline-none disabled:border-slate-300 disabled:bg-slate-100"
        readOnly
      />
      <svg
        className="pointer-events-none absolute top-0 left-0 hidden h-5 w-5 stroke-white peer-checked:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </span>
    <label
      htmlFor={id}
      className="cursor-default leading-relaxed text-slate-800 select-none"
    >
      {label ?? children}
    </label>
  </div>
);

export default function Challenge() {
  return (
    <section className="mx-auto my-10 max-w-4xl rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-8 shadow-xl">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🎯</span>
          <span className="text-2xl font-bold tracking-tight text-slate-900 drop-shadow-sm">
            Interview Challenge: Address Book App
          </span>
        </div>
        {/* Baseline stack section */}
        <div className="flex flex-col gap-2 rounded-xl border border-violet-200 bg-violet-50 p-4 shadow-sm">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-lg">🛠️</span>
            <span className="text-base font-semibold text-violet-700">
              Baseline Tech Stack
            </span>
          </div>
          <ul className="flex flex-wrap gap-3 text-sm font-medium text-violet-900">
            <li className="rounded-md border border-violet-200 bg-violet-100 px-2 py-1">
              React
            </li>
            <li className="rounded-md border border-violet-200 bg-violet-100 px-2 py-1">
              Next.js
            </li>
            <li className="rounded-md border border-violet-200 bg-violet-100 px-2 py-1">
              tRPC
            </li>
            <li className="rounded-md border border-violet-200 bg-violet-100 px-2 py-1">
              Prisma
            </li>
            <li className="rounded-md border border-violet-200 bg-violet-100 px-2 py-1">
              SQLite
            </li>
          </ul>
          <div className="mt-1 text-xs text-violet-700">
            <span className="font-semibold">Note:</span> You are{" "}
            <span className="font-semibold">not expected</span> to add extra
            libraries (e.g. shadcn/ui, Tailwind, etc.), but you may do so if you
            wish. Focus on the baseline stack above.
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-sky-700">
          <span>📌</span> Goal
        </h2>
        <ul className="mt-1 ml-2">
          <Checkbox disabled>
            Fetches and displays user data from{" "}
            <a
              href="https://dummyjson.com/users"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://dummyjson.com/users
            </a>
          </Checkbox>
          <Checkbox disabled>
            Presents the data in a clean and user-friendly UI
          </Checkbox>
          <Checkbox disabled>
            Enables interactive filtering, sorting, and search
          </Checkbox>
          <Checkbox disabled>
            Is built with maintainability, clarity, and type safety in mind
          </Checkbox>
        </ul>
      </div>

      <div className="mb-10">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-sky-700">
          <span>🧩</span> Requirements Split
        </h2>

        <div className="mb-6">
          <h3 className="mt-4 mb-2 text-lg font-semibold text-green-700">
            🎨 Frontend (Design)
          </h3>
          <p className="mb-2 text-sm text-slate-600">
            Focus on CSS skills, Tailwind, fancy animations, and visual appeal.
          </p>
          <ul className="mt-1 ml-2">
            <Checkbox disabled>
              Design a visually appealing UI for the address book using Tailwind
              CSS
            </Checkbox>
            <Checkbox disabled>
              Implement smooth animations for interactions (e.g., hover effects,
              transitions)
            </Checkbox>
            <Checkbox disabled>
              Ensure responsive design that works on mobile and desktop
            </Checkbox>
            <Checkbox disabled>
              Use creative layouts, colors, and typography to enhance user
              experience
            </Checkbox>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="mt-4 mb-2 text-lg font-semibold text-blue-700">
            ⚙️ Frontend (Engineering)
          </h3>
          <p className="mb-2 text-sm text-slate-600">
            Focus on cache, API call optimization, query invalidation, etc.
          </p>
          <ul className="mt-1 ml-2">
            <Checkbox disabled>
              Implement efficient caching for API responses using tRPC/React
              Query
            </Checkbox>
            <Checkbox disabled>
              Optimize API calls with debouncing for search and proper query
              invalidation
            </Checkbox>
            <Checkbox disabled>
              Handle loading states and error boundaries effectively
            </Checkbox>
            <Checkbox disabled>
              Ensure component re-renders are minimized with proper memoization
            </Checkbox>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="mt-4 mb-2 text-lg font-semibold text-purple-700">
            🔗 Backend (Integration)
          </h3>
          <p className="mb-2 text-sm text-slate-600">
            Focus on integration patterns, queues, API calls, failure handling,
            etc.
          </p>
          <ul className="mt-1 ml-2">
            <Checkbox disabled>
              Integrate with external API (dummyjson.com) with proper error
              handling and retries
            </Checkbox>
            <Checkbox disabled>
              Implement data fetching patterns using tRPC routers
            </Checkbox>
            <Checkbox disabled>
              Handle API failures gracefully with fallback mechanisms
            </Checkbox>
            <Checkbox disabled>
              Consider asynchronous processing or queuing if applicable
            </Checkbox>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="mt-4 mb-2 text-lg font-semibold text-red-700">
            🚀 Backend (Optimization)
          </h3>
          <p className="mb-2 text-sm text-slate-600">
            Focus on optimized DB calls, cache, invalidations, algorithms O(1),
            etc.
          </p>
          <ul className="mt-1 ml-2">
            <Checkbox disabled>
              Optimize database queries with efficient Prisma operations
            </Checkbox>
            <Checkbox disabled>
              Implement caching strategies for frequently accessed data
            </Checkbox>
            <Checkbox disabled>
              Use O(1) or efficient algorithms for sorting, filtering, and
              search
            </Checkbox>
            <Checkbox disabled>
              Ensure proper indexing and query invalidation for performance
            </Checkbox>
          </ul>
        </div>
      </div>

      <div className="mb-10 rounded-xl border border-sky-100 bg-sky-50 p-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-sky-700">
          <span>✅</span> Bonus Points For
        </h2>
        <ul className="mt-1 ml-2">
          <Checkbox disabled>Unit or component tests</Checkbox>
          <Checkbox disabled>Error/loading state handling</Checkbox>
          <Checkbox disabled>Good UX on empty results / edge cases</Checkbox>
          <Checkbox disabled>Responsive design</Checkbox>
          <Checkbox disabled>Clear and concise commit messages</Checkbox>
          <Checkbox disabled>
            Using git branches and opening a PR (see instructions below)
          </Checkbox>
          <Checkbox disabled>
            Thinking holistically — e.g. consider performance, accessibility,
            and extensibility
          </Checkbox>
          <Checkbox disabled>Deployed app</Checkbox>
          <Checkbox disabled>
            Implement a working todo list feature that stores in database
          </Checkbox>
        </ul>
      </div>
      <div className="mb-10">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-sky-700">
          <span>🧪</span> Evaluation Criteria
        </h2>
        <ul className="mt-1 ml-2">
          <Checkbox disabled>Code quality and clarity</Checkbox>
          <Checkbox disabled>Type safety and data validation</Checkbox>
          <Checkbox disabled>UI/UX polish</Checkbox>
          <Checkbox disabled>Git hygiene and documentation</Checkbox>
          <Checkbox disabled>
            Communication of your thought process and trade-offs
          </Checkbox>
        </ul>
      </div>
      <div className="relative mb-10 rounded-xl border border-orange-200 bg-white p-4">
        <div className="absolute top-0 left-0 h-full w-1.5 rounded-l-xl bg-orange-200" />
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-orange-700">
          Setup & Submission Instructions
        </h2>
        <ol className="mt-1 ml-2 space-y-1 text-slate-800">
          <Checkbox disabled>
            Clone this repository:{" "}
            <b>https://github.com/andrashejj/interview</b>
          </Checkbox>
          <Checkbox disabled>
            Create a new branch: <code>yourname/address-book-challenge</code>
          </Checkbox>
          <Checkbox disabled>Implement the challenge</Checkbox>
          <Checkbox disabled>
            Open a Pull Request against main that includes:
            <ul className="list-disc pl-6">
              <li>What you’ve completed</li>
              <li>What’s missing or could be improved</li>
              <li>What was easy/difficult and why</li>
              <li>What the next steps would be (with rough time estimates)</li>
              <li>Anything you’d do differently if you had more time</li>
            </ul>
          </Checkbox>
        </ol>
      </div>
      <div className="relative mb-2 rounded-xl border border-yellow-200 bg-white p-4">
        <div className="absolute top-0 left-0 h-full w-1.5 rounded-l-xl bg-yellow-200" />
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-yellow-700">
          Timebox
        </h2>
        <p className="text-slate-800">
          You shouldn’t spend more than <b>1 hour</b> on this. We don’t expect
          perfection, but we do want to see your thinking and your baseline
          approach to writing good software.
        </p>
      </div>
    </section>
  );
}