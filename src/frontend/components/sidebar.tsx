import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';

import Logo from './logo';

import { navigationTabs, exitTab } from '../utils/data';
import { useTabStore } from '../utils/tab-store';

export default function Sidebar() {
	const tab = useTabStore((state) => state.tab);
	const setTab = useTabStore((state) => state.setTab);

	const tabRef = useRef<HTMLSpanElement>(null);
	const navRef = useRef<HTMLDivElement>(null);
	const [selectedNavTab, setSelectedTab] = useState(
		navigationTabs.findIndex((navTab) => navTab.name === tab.name)
	);

	useEffect(() => {
		if (!tabRef.current || !navRef.current) return;

		const navTab = navRef.current.children[
			selectedNavTab + 1
		] as HTMLButtonElement;

		animate(
			tabRef.current,
			{ top: `${navTab.offsetTop}px` },
			{
				duration: 0.15,
				ease: 'easeOut',
			}
		);

		setTab(navigationTabs[selectedNavTab]);
	}, [selectedNavTab]);

	return (
		<aside className='w-80 h-full pr-12 flex flex-col gap-24 border-r border-accent'>
			<Logo className='w-36' />
			<nav
				ref={navRef}
				className='relative flex-grow flex flex-col place-content-start place-items-start gap-4'
			>
				<span
					ref={tabRef}
					className='w-full h-12 absolute top-0 left-0 bg-accent rounded-2xl'
				/>
				{navigationTabs.map((tab, idx) => (
					<button
						key={idx}
						onClick={() => setSelectedTab(idx)}
						className={`w-full h-12 px-6 relative flex place-content-start place-items-center gap-6 ${
							selectedNavTab === idx ? 'text-foreground' : 'text-muted'
						} hover:text-foreground transition-colors duration-150`}
						style={{
							marginTop: tab.name === 'Exit' ? 'auto' : '0px',
						}}
					>
						<tab.icon className='w-4 stroke-current' />
						<p className='font-medium text-base leading-none tracking-tighter'>
							{tab.name}
						</p>
					</button>
				))}
			</nav>
			<button
				onClick={() => {}}
				className='w-full h-12 mt-auto px-6 flex place-content-start place-items-center gap-6 text-muted hover:text-danger transition-colors duration-150'
			>
				<exitTab.icon className='w-4 stroke-current' />
				<p className='font-medium text-base leading-none tracking-tighter'>
					{exitTab.name}
				</p>
			</button>
		</aside>
	);
}
