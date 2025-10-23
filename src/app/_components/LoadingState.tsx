export function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center">
        <div className="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600"></div>
        <p className="text-lg font-medium text-slate-600">Loading contacts...</p>
        <p className="mt-2 text-sm text-slate-500">This may take a moment</p>
      </div>
    </div>
  );
}