import Logo from './logo';

import { navigationTabs } from '../utils/data';

export default function Sidebar() {
	return (
		<aside className='w-80 h-full pr-12 flex flex-col gap-24 border-r border-accent'>
			<Logo className='w-36' />
			<nav className='flex-grow flex flex-col place-content-start place-items-start gap-5'>
				{navigationTabs.map((tab) => (
					<button
						className='h-14 px-6 flex place-content-start place-items-center gap-6'
						style={{
							marginTop: tab.name === 'Exit' ? 'auto' : '0px',
						}}
					>
						<tab.icon className='w-5 stroke-current' />
						<p className='leading-none text-xl'>{tab.name}</p>
					</button>
				))}
			</nav>
		</aside>
	);
}
