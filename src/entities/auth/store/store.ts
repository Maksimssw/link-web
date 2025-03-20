import { create } from 'zustand';
import { AuthState, User } from '@/entities/auth'

export const useAuthStore  = create<AuthState>((set, get) => ({
	isAuthenticated: false,
	user: null,

	setUser: (user: User | null) => {
		set({ user, isAuthenticated: !!user });
	}
}))