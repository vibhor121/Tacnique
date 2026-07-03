import { UserForm } from '../types';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmailValid = (email: string): boolean => emailPattern.test(email.trim());

export const validateUserForm = (form: UserForm): { valid: boolean; message?: string } => {
  if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.department.trim()) {
    return { valid: false, message: 'Please fill in all fields.' };
  }

  if (!isEmailValid(form.email)) {
    return { valid: false, message: 'Please enter a valid email address.' };
  }

  return { valid: true };
};
