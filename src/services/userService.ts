import { UserForm, User } from '../types';

const API_BASE = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE}/users`);
  if (!response.ok) {
    throw new Error('Unable to load users.');
  }
  const data = await response.json();
  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    username: item.username,
    email: item.email,
    department: item.company?.name || 'General'
  }));
};

export const addUser = async (payload: UserForm): Promise<User> => {
  const response = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `${payload.firstName} ${payload.lastName}`,
      email: payload.email,
      username: payload.firstName.toLowerCase(),
      company: { name: payload.department }
    })
  });

  if (!response.ok) {
    throw new Error('Unable to add user.');
  }
  const data = await response.json();
  return {
    id: data.id || Date.now(),
    name: `${payload.firstName} ${payload.lastName}`,
    username: payload.firstName.toLowerCase(),
    email: payload.email,
    department: payload.department
  };
};

export const updateUser = async (id: number, payload: UserForm): Promise<User> => {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `${payload.firstName} ${payload.lastName}`,
      email: payload.email,
      username: payload.firstName.toLowerCase(),
      company: { name: payload.department }
    })
  });

  if (!response.ok) {
    throw new Error('Unable to save user.');
  }
  const data = await response.json();
  return {
    id: data.id || id,
    name: `${payload.firstName} ${payload.lastName}`,
    username: payload.firstName.toLowerCase(),
    email: payload.email,
    department: payload.department
  };
};

export const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Unable to delete user.');
  }
};
