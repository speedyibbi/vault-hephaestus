import { motion } from 'framer-motion';

import AccountInfoPanelDataItem from './account-info-panel-data-item';

interface Props {
	details: {
		[key: string]: {
			value: string;
			sensitive: string;
		};
	};
}

export default function AccountInfoPanelData({ details }: Props) {
	return (
		<motion.article
			key='data'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			className='w-full h-full flex flex-col place-content-start place-items-stretch gap-12 overflow-y-scroll'
		>
			{Object.entries(details).map(([key, value], idx) => (
				<AccountInfoPanelDataItem
					key={JSON.stringify(details) + idx}
					name={key}
					value={value.value}
					sensitive={parseInt(value.sensitive) === 1}
				/>
			))}
		</motion.article>
	);
}
