import { User } from '@/lib/zodSchemas';
interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Photo</th>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Email</th>
          <th className="p-2 text-left">Age</th>
          <th className="p-2 text-left">Phone</th>
          <th className="p-2 text-left">Gender</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u: any) => (
          <tr key={u.id} className="border-t">
            <td className="p-2">
              <img src={u.image} alt={u.firstName} className="w-10 h-10 rounded-full" />
            </td>
            <td className="p-2">{u.firstName} {u.lastName}</td>
            <td className="p-2">{u.email}</td>
            <td className="p-2">{u.age}</td>
            <td className="p-2">{u.phone}</td>
            <td className="p-2">{u.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}