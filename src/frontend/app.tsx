import { AnimatePresence } from 'framer-motion';

import MainLayout from './layouts/main-layout';

import { useTabStore } from './utils/stores/tab-store';

export default function App() {
	const tab = useTabStore((state) => state.tab);

	return (
		<div className='w-screen h-screen relative overflow-hidden'>
			<MainLayout>
				<AnimatePresence>
					<tab.page />
				</AnimatePresence>
			</MainLayout>
		</div>
	);
}
