export default function Loader() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative flex items-center justify-center w-24 h-24">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 opacity-50 blur-xl animate-pulse" />
            <div className="w-16 h-16 border-4 border-transparent border-t-white rounded-full animate-spin" />
          </div>
      
          <div className="text-center">
            <p className="text-2xl font-semibold tracking-wide">Fetching users data...</p>
            <p className="text-sm text-gray-300 mt-1">Please hang tight while we load the data</p>
          </div>
        </div>
      </main>
    );
  }