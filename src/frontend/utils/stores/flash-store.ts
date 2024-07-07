import { create } from 'zustand';

interface FlashStore {
	error: boolean;
	text: string;
	setFlash: (flash: IFlash) => void;
}

export const useFlashStore = create<FlashStore>((set) => ({
	error: false,
	text: '',
	setFlash: (flash) => set({ error: flash.error, text: flash.text }),
}));
