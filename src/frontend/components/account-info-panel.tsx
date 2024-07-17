import { ForwardedRef, forwardRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import SectionSelector from './section-selector';
import AccountInfoPanelData from './account-info-panel-data';
import Button from './button';
import { Trash } from './icons';

interface Props {
	account: IAccount;
	onEdit?: () => void;
}

function AccountInfoPanel(
	{ account, onEdit = () => {} }: Props,
	ref: ForwardedRef<HTMLDivElement>
) {
	const [selectedSection, setSelectedSection] = useState('Data');

	const selectSection = (section: 'Data' | 'History') => {
		setSelectedSection(section);
	};

	function formatDateString(dateString: string) {
		const date = new Date(dateString);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();

		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const meridian = date.getHours() >= 12 ? 'PM' : 'AM';

		return `${day}/${month}/${year} ${hours}:${minutes}${meridian}`;
	}

	return (
		<motion.aside
			ref={ref}
			layout
			className='max-w-xl w-0 p-12 transform translate-x-12 flex flex-col place-content-start place-items-stretch gap-16 bg-accent rounded-2xl opacity-0 overflow-hidden'
		>
			<div className='flex place-content-start place-items-center gap-6'>
				<img
					src={account?.image}
					alt={`${account?.title}-image`}
					className='w-32 h-32 rounded-full'
				/>
				<span>
					<p className='mb-3 font-medium text-3xl text-foreground leading-none tracking-tighter'>
						{account?.title}
					</p>
					<Button text='Edit' onClick={onEdit} />
				</span>
			</div>
			<SectionSelector
				key={account?.account_id}
				sections={['Data', 'History']}
				onSectionSelect={selectSection}
			/>
			<AnimatePresence mode='wait'>
				{selectedSection === 'Data' && account?.details !== undefined ? (
					<AccountInfoPanelData details={account?.details} />
				) : selectedSection === 'History' ? (
					<motion.article
						key='history'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15, ease: 'easeOut' }}
						className='w-full h-full overflow-y-scroll'
					></motion.article>
				) : (
					<></>
				)}
			</AnimatePresence>
			<div className='w-full mt-auto flex place-content-between place-items-end'>
				<p className='font-medium text-base text-muted leading-none tracking-tighter'>
					Last modified: {account && formatDateString(account?.updated_at)}
				</p>
				<Button
					text='Remove'
					icon={Trash}
					iconPosition='left'
					onClick={() => {}}
					style={{ color: 'var(--danger)' }}
				/>
			</div>
		</motion.aside>
	);
}

export default forwardRef(AccountInfoPanel);
