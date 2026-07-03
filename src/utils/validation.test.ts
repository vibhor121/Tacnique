import { describe, expect, it } from 'vitest';
import { isEmailValid, validateUserForm } from './validation';

describe('validation utilities', () => {
  it('validates correct email addresses', () => {
    expect(isEmailValid('test@example.com')).toBe(true);
  });

  it('rejects invalid email addresses', () => {
    expect(isEmailValid('invalid-email')).toBe(false);
  });

  it('requires all form fields', () => {
    const result = validateUserForm({ firstName: 'Jane', lastName: '', email: 'jane@example.com', department: 'HR' });
    expect(result.valid).toBe(false);
    expect(result.message).toContain('fill in all fields');
  });
});
