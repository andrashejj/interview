interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
}

export function UserCard({ user }: { user: User }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xl font-semibold text-slate-900">
            {user.name}
          </h3>
          <p className="truncate text-sm text-slate-600">{user.company.name}</p>
        </div>
        <div className="ml-3 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-semibold text-white">
          {user.name.charAt(0)}
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center text-sm">
          <span className="w-5 flex-shrink-0 text-slate-400">📧</span>
          <a href={`mailto:${user.email}`} className="ml-2 truncate text-blue-600 hover:underline">
            {user.email}
          </a>
        </div>
        <div className="flex items-center text-sm">
          <span className="w-5 flex-shrink-0 text-slate-400">📞</span>
          <a href={`tel:${user.phone}`} className="ml-2 text-slate-700 hover:text-blue-600">
            {user.phone}
          </a>
        </div>
        <div className="flex items-center text-sm">
          <span className="w-5 flex-shrink-0 text-slate-400">🌐</span>
          <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="ml-2 truncate text-blue-600 hover:underline">
            {user.website}
          </a>
        </div>
        <div className="flex items-start text-sm">
          <span className="mt-0.5 w-5 flex-shrink-0 text-slate-400">📍</span>
          <span className="ml-2 text-xs leading-relaxed text-slate-700">
            {user.address.city}, {user.address.zipcode}
          </span>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <p className="line-clamp-2 text-xs italic text-slate-500">
          &quot;{user.company.catchPhrase}&quot;
        </p>
      </div>
    </div>
  );
}
