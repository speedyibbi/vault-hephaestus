import { create } from 'zustand';

interface PasswordStore {
	password: string;
	passwordIndex: number;
	setPassword: (password: string) => void;
	incrementPasswordIndex: () => void;
}

export const usePasswordStore = create<PasswordStore>((set, get) => ({
	password: '',
	passwordIndex: 0,
	setPassword: (password) => set({ password }),
	incrementPasswordIndex: () => set({ passwordIndex: get().passwordIndex + 1 }),
}));
