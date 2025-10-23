interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <div className="mb-4 text-6xl">⚠️</div>
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          Oops! Something went wrong
        </h2>
        <p className="mb-6 text-slate-600">{error}</p>
        <button
          onClick={onRetry}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}