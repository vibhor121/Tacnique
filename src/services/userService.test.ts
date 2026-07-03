import { describe, expect, it, vi, beforeEach } from 'vitest';
import { fetchUsers, addUser } from './userService';

describe('userService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchUsers returns mapped user list', async () => {
    const apiResponse = [
      {
        id: 1,
        name: 'Aditi Sharma',
        username: 'aditisharma',
        email: 'aditi.sharma@example.com',
        company: { name: 'Marketing' }
      }
    ];

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => apiResponse
    } as never));

    const users = await fetchUsers();
    expect(users).toEqual([
      {
        id: 1,
        name: 'Aditi Sharma',
        username: 'aditisharma',
        email: 'aditi.sharma@example.com',
        department: 'Marketing'
      }
    ]);
  });

  it('addUser throws when API returns error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      text: async () => 'Bad request'
    } as never));

    await expect(
      addUser({ firstName: 'Amit', lastName: 'Patel', email: 'amit.patel@example.com', department: 'Sales' })
    ).rejects.toThrow('Unable to add user.');
  });
});
