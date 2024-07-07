import { create } from 'zustand';

import { navigationTabs } from '../data';

interface TabStore {
	tab: INavigationTab;
	setTab: (tab: INavigationTab) => void;
}

export const useTabStore = create<TabStore>((set) => ({
	tab: navigationTabs[0],
	setTab: (tab) => set({ tab }),
}));
