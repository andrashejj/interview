import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useUsers } from "@/hooks/useUsers";
import { SearchBar } from "@/components/SearchBar";
import { FilterPanel } from "@/components/FilterPanel";
import { UserTable } from "@/components/UserTable";
import { Pagination } from "@/components/Pagination";

export default function Home() {
  const router = useRouter();

  // Parse URL query params
  const queryPage = router.query.page ? Number(router.query.page) : 1;
  const queryPageSize = router.query.pageSize
    ? Number(router.query.pageSize)
    : 10;
  const querySearch = (router.query.search as string) || "";
  const queryGender = (router.query.gender as string) || "";
  const queryHairColor = (router.query.hairColor as string) || "";
  const queryEyeColor = (router.query.eyeColor as string) || "";
  const queryBloodGroup = (router.query.bloodGroup as string) || "";

  // Local state
  const [page, setPage] = useState(queryPage);
  const [pageSize, setPageSize] = useState(queryPageSize);
  const [search, setSearch] = useState(querySearch);
  const [gender, setGender] = useState(queryGender);
  const [hairColor, setHairColor] = useState(queryHairColor);
  const [eyeColor, setEyeColor] = useState(queryEyeColor);
  const [bloodGroup, setBloodGroup] = useState(queryBloodGroup);

  // Fetch users with filters
  const { users, total, activeFilters, totalPages, isLoading, isError, error } =
    useUsers({
      page,
      pageSize,
      search: search || undefined,
      gender: gender || undefined,
      hairColor: hairColor || undefined,
      eyeColor: eyeColor || undefined,
      bloodGroup: bloodGroup || undefined,
    });

  // Update URL when filters change
  const updateURL = (params: Record<string, string | number>) => {
    const newQuery = {
      ...(params.page && params.page !== 1 ? { page: params.page } : {}),
      ...(params.pageSize && params.pageSize !== 10
        ? { pageSize: params.pageSize }
        : {}),
      ...(params.search ? { search: params.search } : {}),
      ...(params.gender ? { gender: params.gender } : {}),
      ...(params.hairColor ? { hairColor: params.hairColor } : {}),
      ...(params.eyeColor ? { eyeColor: params.eyeColor } : {}),
      ...(params.bloodGroup ? { bloodGroup: params.bloodGroup } : {}),
    };

    void router.push(
      {
        pathname: "/",
        query: newQuery,
      },
      undefined,
      { shallow: true },
    );
  };

  // Handlers
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    updateURL({
      page: 1,
      pageSize,
      search: value,
      gender,
      hairColor,
      eyeColor,
      bloodGroup,
    });
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
    setPage(1);
    updateURL({
      page: 1,
      pageSize,
      search,
      gender: value,
      hairColor,
      eyeColor,
      bloodGroup,
    });
  };

  const handleHairColorChange = (value: string) => {
    setHairColor(value);
    setPage(1);
    updateURL({
      page: 1,
      pageSize,
      search,
      gender,
      hairColor: value,
      eyeColor,
      bloodGroup,
    });
  };

  const handleEyeColorChange = (value: string) => {
    setEyeColor(value);
    setPage(1);
    updateURL({
      page: 1,
      pageSize,
      search,
      gender,
      hairColor,
      eyeColor: value,
      bloodGroup,
    });
  };

  const handleBloodGroupChange = (value: string) => {
    setBloodGroup(value);
    setPage(1);
    updateURL({
      page: 1,
      pageSize,
      search,
      gender,
      hairColor,
      eyeColor,
      bloodGroup: value,
    });
  };

  const handleClearFilters = () => {
    setGender("");
    setHairColor("");
    setEyeColor("");
    setBloodGroup("");
    setPage(1);
    updateURL({
      page: 1,
      pageSize,
      search,
      gender: "",
      hairColor: "",
      eyeColor: "",
      bloodGroup: "",
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateURL({
      page: newPage,
      pageSize,
      search,
      gender,
      hairColor,
      eyeColor,
      bloodGroup,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
    updateURL({
      page: 1,
      pageSize: newPageSize,
      search,
      gender,
      hairColor,
      eyeColor,
      bloodGroup,
    });
  };

  return (
    <>
      <Head>
        <title>Address Book - User Directory</title>
        <meta
          name="description"
          content="Browse and search users in the address book"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Address Book</h1>
            <p className="mt-2 text-lg text-gray-600">
              Browse and search through our user directory
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <SearchBar
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by name, email, phone, or company..."
            />

            <FilterPanel
              gender={gender}
              hairColor={hairColor}
              eyeColor={eyeColor}
              bloodGroup={bloodGroup}
              onGenderChange={handleGenderChange}
              onHairColorChange={handleHairColorChange}
              onEyeColorChange={handleEyeColorChange}
              onBloodGroupChange={handleBloodGroupChange}
              onClearAll={handleClearFilters}
            />
          </div>

          {/* Users Table */}
          <div className="mb-6">
            <UserTable
              users={users}
              activeFilters={activeFilters}
              isLoading={isLoading}
              isError={isError}
              error={error}
            />
          </div>

          {/* Pagination */}
          {!isLoading && !isError && total > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              pageSize={pageSize}
              total={total}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </div>
      </main>
    </>
  );
}
