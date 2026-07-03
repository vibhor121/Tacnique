import { FormEvent, useEffect, useMemo, useState } from 'react';
import { User, UserForm } from './types';
import { addUser, deleteUser, fetchUsers, updateUser } from './services/userService';
import { validateUserForm } from './utils/validation';
import DashboardHeader from './components/DashboardHeader';
import FilterPanel from './components/FilterPanel';
import PaginationBar from './components/PaginationBar';
import SearchSortPanel from './components/SearchSortPanel';
import UserFormCard from './components/UserFormCard';
import UserTable from './components/UserTable';

const defaultForm: UserForm = {
  firstName: '',
  lastName: '',
  email: '',
  department: ''
};

const filterFields = ['firstName', 'lastName', 'email', 'department'] as const;

type FilterFields = Record<(typeof filterFields)[number], string>;

const initialFilterState: FilterFields = {
  firstName: '',
  lastName: '',
  email: '',
  department: ''
};

const getNameParts = (name: string) => {
  const [firstName, ...rest] = name.split(' ');
  return {
    firstName: firstName || '',
    lastName: rest.join(' ') || ''
  };
};

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'id' | 'name' | 'email' | 'department'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<FilterFields>(initialFilterState);
  const [form, setForm] = useState<UserForm>(defaultForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        const lowerSearch = search.toLowerCase();
        const [firstName, lastName] = [user.name.split(' ')[0] ?? '', user.name.split(' ').slice(1).join(' ') ?? ''];
        const matchesSearch =
          user.id.toString().includes(lowerSearch) ||
          user.name.toLowerCase().includes(lowerSearch) ||
          user.email.toLowerCase().includes(lowerSearch) ||
          user.department.toLowerCase().includes(lowerSearch);

        const matchesFilter = filterFields.every((field) => {
          const filterValue = filter[field].toLowerCase();
          if (!filterValue) return true;
          if (field === 'firstName') return firstName.toLowerCase().includes(filterValue);
          if (field === 'lastName') return lastName.toLowerCase().includes(filterValue);
          return user[field].toLowerCase().includes(filterValue);
        });

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return sortOrder === 'asc'
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
  }, [users, search, filter, sortKey, sortOrder]);

  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const currentUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);

  const handleSortChange = (key: 'id' | 'name' | 'email' | 'department') => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(defaultForm);
  };

  const openEditForm = (user: User) => {
    const parts = getNameParts(user.name);
    setEditingId(user.id);
    setForm({
      firstName: parts.firstName,
      lastName: parts.lastName,
      email: user.email,
      department: user.department
    });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateUserForm(form);
    if (!validation.valid) {
      setError(validation.message ?? 'Invalid form data.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (editingId) {
        const updatedUser = await updateUser(editingId, form);
        setUsers((prev) => prev.map((user) => (user.id === editingId ? updatedUser : user)));
      } else {
        const addedUser = await addUser(form);
        setUsers((prev) => [addedUser, ...prev]);
        setPage(1);
      }
      setForm(defaultForm);
      setEditingId(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!window.confirm('Delete this user?')) {
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 px-4 py-8 text-purple-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader userCount={users.length} />
        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <aside className="space-y-6">
            <SearchSortPanel
              search={search}
              sortKey={sortKey}
              sortOrder={sortOrder}
              pageSize={pageSize}
              filterOpen={filterOpen}
              onSearchChange={setSearch}
              onSortChange={handleSortChange}
              onPageSizeChange={(value) => {
                setPageSize(value);
                setPage(1);
              }}
              onToggleFilter={() => setFilterOpen((open) => !open)}
            />
            {filterOpen && <FilterPanel filter={filter} onFilterChange={(field, value) => setFilter((prev) => ({ ...prev, [field]: value }))} />}
          </aside>

          <main className="space-y-6">
            <section className="overflow-hidden rounded-[1.75rem] border border-purple-100 bg-white/95 p-6 shadow-soft shadow-purple-200/20">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-purple-950">User list</h2>
                  <p className="mt-2 text-sm text-purple-600">Showing {filteredUsers.length} results across {pageCount} pages.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-purple-50 px-4 py-3 text-sm text-purple-700">
                    <p className="text-xs uppercase tracking-[0.3em] text-purple-500">Current page</p>
                    <p className="mt-2 text-lg font-semibold">{page}</p>
                  </div>
                  <div className="rounded-3xl bg-purple-50 px-4 py-3 text-sm text-purple-700">
                    <p className="text-xs uppercase tracking-[0.3em] text-purple-500">Active results</p>
                    <p className="mt-2 text-lg font-semibold">{filteredUsers.length}</p>
                  </div>
                </div>
              </div>

              <UserTable users={currentUsers} loading={loading} error={error} onEdit={openEditForm} onDelete={handleDeleteUser} />

              <PaginationBar
                page={page}
                pageCount={pageCount}
                pageSize={pageSize}
                onPrevious={() => setPage((prev) => Math.max(1, prev - 1))}
                onNext={() => setPage((prev) => Math.min(pageCount, prev + 1))}
                onPageSizeChange={(value) => {
                  setPageSize(value);
                  setPage(1);
                }}
              />
            </section>

            <UserFormCard
              form={form}
              onChange={(field, value) => setForm((prev) => ({ ...prev, [field]: value }))}
              onSubmit={handleFormSubmit}
              isEditing={Boolean(editingId)}
              onCancel={() => {
                setEditingId(null);
                setForm(defaultForm);
              }}
              submitting={submitting}
              error={error}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
