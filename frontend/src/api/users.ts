import { api } from './client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  available_classes: number;
  created_at: string;
}

export const usersApi = {
  getAll: () => api.get<User[]>('/users'),
  updateClasses: (id: string, available_classes: number) => 
    api.put<{ message: string; user: User }>(`/users/${id}/classes`, { available_classes })
      .then(res => res.user)
};
