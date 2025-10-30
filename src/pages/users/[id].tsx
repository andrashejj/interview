import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { TodosDrawer } from "@/components/TodosDrawer";

export default function UserDetailPage() {
  const router = useRouter();
  const userId = router.query.id ? Number(router.query.id) : undefined;

  const [isTodosDrawerOpen, setIsTodosDrawerOpen] = useState(false);

  const { user, isLoading, isError, error } = useUser(userId);

  // Parse JSON fields
  const bankInfo = user?.bankJson ? JSON.parse(user.bankJson) : null;
  const cryptoInfo = user?.cryptoJson ? JSON.parse(user.cryptoJson) : null;

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading User...</title>
        </Head>
        <main className="min-h-screen bg-gray-50">
          <div className="flex min-h-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        </main>
      </>
    );
  }

  if (isError || !user) {
    return (
      <>
        <Head>
          <title>User Not Found</title>
        </Head>
        <main className="min-h-screen bg-gray-50">
          <div className="flex min-h-screen flex-col items-center justify-center px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900">
                User Not Found
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                {error?.message || "The user you're looking for doesn't exist."}
              </p>
              <Link href="/">
                <Button className="mt-6" variant="primary">
                  Back to User List
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>
          {user.firstName} {user.lastName} - Address Book
        </title>
        <meta
          name="description"
          content={`Profile for ${user.firstName} ${user.lastName}`}
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <svg
                className="mr-2 -ml-1 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Users
            </Button>
          </Link>

          {/* Header Card */}
          <div className="mb-6 overflow-hidden rounded-lg bg-white shadow">
            <div className="bg-linear-to-r from-blue-500 to-blue-600 px-6 py-12">
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white bg-gray-200">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-500">
                      <svg
                        className="h-12 w-12"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {user.firstName} {user.lastName}
                  </h1>
                  {user.maidenName && (
                    <p className="mt-1 text-blue-100">née {user.maidenName}</p>
                  )}
                  <p className="mt-2 text-blue-100">@{user.username}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Contact Information
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.phone || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Username
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.username}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Personal Details */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Personal Details
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Age</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.age || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.gender || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Birth Date
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.birthDate || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Blood Group
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.bloodGroup || "N/A"}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Physical Attributes */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Physical Attributes
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Height</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.height ? `${user.height} cm` : "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Weight</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.weight ? `${user.weight} kg` : "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Eye Color
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.eyeColor || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Hair</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.hairColor || "N/A"}
                    {user.hairType && ` (${user.hairType})`}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Address */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Address
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Street</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.address || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">City</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.city || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">State</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.state || "N/A"}
                    {user.stateCode && ` (${user.stateCode})`}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Postal Code
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.postalCode || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Country</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.country || "N/A"}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Company */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Company
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Company Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.companyName || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Title</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.companyTitle || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Department
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.companyDepartment || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.companyAddress
                      ? `${user.companyAddress}, ${user.companyCity || ""}, ${user.companyState || ""}`
                      : "N/A"}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Education */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Education
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    University
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.university || "N/A"}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Bank Information */}
            {bankInfo && (
              <div className="rounded-lg bg-white p-6 shadow">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  Bank Information
                </h2>
                <dl className="space-y-3">
                  {bankInfo.cardNumber && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Card Number
                      </dt>
                      <dd className="mt-1 font-mono text-sm text-gray-900">
                        {bankInfo.cardNumber}
                      </dd>
                    </div>
                  )}
                  {bankInfo.cardType && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Card Type
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {bankInfo.cardType}
                      </dd>
                    </div>
                  )}
                  {bankInfo.currency && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Currency
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {bankInfo.currency}
                      </dd>
                    </div>
                  )}
                  {bankInfo.iban && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        IBAN
                      </dt>
                      <dd className="mt-1 font-mono text-sm text-gray-900">
                        {bankInfo.iban}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* Crypto Information */}
            {cryptoInfo && (
              <div className="rounded-lg bg-white p-6 shadow">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  Crypto Information
                </h2>
                <dl className="space-y-3">
                  {cryptoInfo.coin && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Coin
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {cryptoInfo.coin}
                      </dd>
                    </div>
                  )}
                  {cryptoInfo.wallet && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Wallet
                      </dt>
                      <dd className="mt-1 font-mono text-sm break-all text-gray-900">
                        {cryptoInfo.wallet}
                      </dd>
                    </div>
                  )}
                  {cryptoInfo.network && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Network
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {cryptoInfo.network}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* Floating Todos Button */}
        <button
          onClick={() => setIsTodosDrawerOpen(true)}
          className="fixed right-8 bottom-8 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-110 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          aria-label="View Todos"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </button>

        {/* Todos Drawer */}
        <TodosDrawer
          isOpen={isTodosDrawerOpen}
          onClose={() => setIsTodosDrawerOpen(false)}
          userId={userId!}
          userName={`${user.firstName} ${user.lastName}`}
        />
      </main>
    </>
  );
}
