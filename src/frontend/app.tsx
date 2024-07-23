import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import AccessPanel from './pages/access-panel';
import MainLayout from './layouts/main-layout';

import { useTabStore } from './utils/stores/tab-store';
import Flash from './components/flash';

export default function App() {
	const tab = useTabStore((state) => state.tab);

	const [accessGranted, setAccessGranted] = useState(false);

	return (
		<div className='w-screen h-screen relative overflow-hidden'>
			<AnimatePresence>
				{!accessGranted ? (
					<AccessPanel onAccessGranted={() => setAccessGranted(true)} />
				) : (
					<MainLayout>
						<AnimatePresence>
							<tab.page />
						</AnimatePresence>
					</MainLayout>
				)}
			</AnimatePresence>
			<Flash />
		</div>
	);
}
