import { motion } from 'framer-motion';

import AccountInfoPanelHistoryItem from './account-info-panel-history-item';

import { formatDateString } from '../utils/helpers';

interface Props {
	history: {
		[key: string]: {
			[key: string]: {
				value: string;
				sensitive: string;
			};
		};
	};
}

export default function AccountInfoPanelHistory({ history }: Props) {
	const items = Object.entries(history).reverse();

	return (
		<motion.article
			key='history'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			className='w-full h-full flex flex-col place-content-start place-items-stretch gap-6 overflow-x-hidden overflow-y-scroll'
		>
			{items.length > 0 ? (
				items.map(([key, value], idx) => (
					<AccountInfoPanelHistoryItem
						key={JSON.stringify(history) + idx}
						date={formatDateString(key)}
						details={value}
					/>
				))
			) : (
				<p className='font-medium text-xl text-muted text-center leading-none tracking-tighter'>
					No History
				</p>
			)}
		</motion.article>
	);
}
