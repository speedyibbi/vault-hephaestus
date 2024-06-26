import { create } from 'zustand';

import { navigationTabs } from './data';

interface Store {
	tab: string;
	setTab: (tab: string) => void;
}

export const useTabStore = create<Store>((set) => ({
	tab: navigationTabs[0].name,
	setTab: (tab: string) => set({ tab }),
}));
