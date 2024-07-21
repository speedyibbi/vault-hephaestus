import { motion } from 'framer-motion';

import AccountInfoPanelHistoryItem from './account-info-panel-history-item';

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
	return (
		<motion.article
			key='history'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			className='w-full h-full flex flex-col place-content-start place-items-stretch gap-12 overflow-y-scroll'
		>
			{Object.entries(history).map(([key, value], idx) => (
				<AccountInfoPanelHistoryItem
					key={JSON.stringify(history) + idx}
					date={key}
					details={value}
				/>
			))}
		</motion.article>
	);
}
