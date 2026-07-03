import { FormEvent } from 'react';
import { UserForm } from '../types';

type UserFormCardProps = {
  form: UserForm;
  onChange: (field: keyof UserForm, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isEditing: boolean;
  onCancel: () => void;
  submitting: boolean;
  error?: string | null;
};

const UserFormCard = ({ form, onChange, onSubmit, isEditing, onCancel, submitting, error }: UserFormCardProps) => (
  <section className="overflow-hidden rounded-[1.75rem] border border-purple-100 bg-white/95 p-6 shadow-soft shadow-purple-200/20">
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-purple-950">{isEditing ? 'Edit user' : 'Add new user'}</h2>
        <p className="mt-2 text-sm text-purple-600">Use the form to create a user or update existing information.</p>
      </div>
      <div className="rounded-3xl bg-purple-50 px-4 py-3 text-sm text-purple-700">
        <span className="font-semibold">Tip:</span> Keep user data clean and complete.
      </div>
    </div>

    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="block text-sm font-medium text-purple-700">
        First name
        <input
          value={form.firstName}
          onChange={(event) => onChange('firstName', event.target.value)}
          className="mt-3 w-full rounded-3xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-950 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
          placeholder="First name"
        />
      </label>
      <label className="block text-sm font-medium text-purple-700">
        Last name
        <input
          value={form.lastName}
          onChange={(event) => onChange('lastName', event.target.value)}
          className="mt-3 w-full rounded-3xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-950 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
          placeholder="Last name"
        />
      </label>
      <label className="block text-sm font-medium text-purple-700 sm:col-span-2">
        Email
        <input
          type="email"
          value={form.email}
          onChange={(event) => onChange('email', event.target.value)}
          className="mt-3 w-full rounded-3xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-950 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
          placeholder="Email address"
        />
      </label>
      <label className="block text-sm font-medium text-purple-700 sm:col-span-2">
        Department
        <input
          value={form.department}
          onChange={(event) => onChange('department', event.target.value)}
          className="mt-3 w-full rounded-3xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-950 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
          placeholder="Department name"
        />
      </label>
      <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-3xl border border-purple-200 bg-white px-5 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-100"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-3xl bg-gradient-to-r from-purple-700 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isEditing ? 'Save changes' : 'Add user'}
        </button>
      </div>
    </form>

    {error && !submitting && (
      <p className="mt-4 rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
    )}
  </section>
);

export default UserFormCard;
