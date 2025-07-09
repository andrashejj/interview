interface UserCardProps {
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        age: number;
        gender: string;
        phone: string;
        image: string;
    };
}

export function UserCard({ user }: UserCardProps) {
    return (
        <div
            className="bg-white/10 rounded-lg shadow-md p-6 flex flex-col items-center text-center border border-white/20"
        >
            <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-white/30"
            />
            <h2 className="text-lg font-semibold mb-1">
                {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-slate-300 mb-1">{user.email}</p>
            <p className="text-sm text-slate-400 mb-1">
                Age: {user.age} | Gender: {user.gender}
            </p>
            <p className="text-sm text-slate-400">{user.phone}</p>
        </div>
    );
} 