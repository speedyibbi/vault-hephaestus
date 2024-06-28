import { create } from 'zustand';

import { navigationTabs } from './data';

interface Store {
	tab: NavigationTab;
	setTab: (tab: NavigationTab) => void;
}

export const useTabStore = create<Store>((set) => ({
	tab: navigationTabs[0],
	setTab: (tab) => set({ tab }),
}));
