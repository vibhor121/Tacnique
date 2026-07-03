import { User } from '../types';

type UserTableProps = {
  users: User[];
  loading: boolean;
  error: string | null;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

const UserTable = ({ users, loading, error, onEdit, onDelete }: UserTableProps) => {
  if (loading) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-purple-200 bg-purple-50 p-10 text-center text-purple-600">
        Loading users…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-purple-100 shadow-sm">
      <table className="min-w-full divide-y divide-purple-200 text-left text-sm">
        <thead className="bg-purple-50 text-purple-700">
          <tr>
            <th className="px-4 py-4 font-semibold">ID</th>
            <th className="px-4 py-4 font-semibold">First Name</th>
            <th className="px-4 py-4 font-semibold">Last Name</th>
            <th className="px-4 py-4 font-semibold">Email</th>
            <th className="px-4 py-4 font-semibold">Department</th>
            <th className="px-4 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-200 bg-white">
          {users.length === 0 ? (
            <tr>
              <td className="px-4 py-10 text-center text-purple-600" colSpan={6}>
                No users found with current filters.
              </td>
            </tr>
          ) : (
            users.map((user) => {
              const [firstName, ...rest] = user.name.split(' ');
              const lastName = rest.join(' ');
              return (
                <tr key={user.id} className="transition hover:bg-purple-50">
                  <td className="px-4 py-4 text-purple-700">{user.id}</td>
                  <td className="px-4 py-4 text-purple-700">{firstName}</td>
                  <td className="px-4 py-4 text-purple-700">{lastName}</td>
                  <td className="px-4 py-4 text-purple-700">{user.email}</td>
                  <td className="px-4 py-4 text-purple-700">{user.department}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(user)}
                        className="rounded-3xl bg-purple-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-800"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(user.id)}
                        className="rounded-3xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
