import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import SectionSelector from './section-selector';
import AccountInfoPanelData from './account-info-panel-data';
import AccountInfoPanelHistory from './account-info-panel-history';
import Button from './button';
import { Image, Trash } from './icons';

import { formatDateString } from '../utils/helpers';
import Modal from './modal';

interface Props {
	account: IAccount;
	onEdit?: () => void;
	onRemove?: () => void;
}

function AccountInfoPanel(
	{ account, onEdit = () => {}, onRemove = () => {} }: Props,
	ref: ForwardedRef<HTMLDivElement>
) {
	const [selectedSection, setSelectedSection] = useState('Data');
	const [removalModalOpen, setRemovalModalOpen] = useState(false);

	const selectSection = (section: 'Data' | 'History') => {
		setSelectedSection(section);
	};

	useEffect(() => {
		setSelectedSection('Data');
	}, [account]);

	return (
		<motion.aside
			ref={ref}
			layout
			className='max-w-xl w-0 p-12 transform translate-x-12 flex flex-col place-content-start place-items-stretch gap-16 bg-accent rounded-2xl opacity-0 overflow-hidden'
		>
			<div className='flex place-content-start place-items-center gap-6'>
				{account?.image.length > 0 ? (
					<img
						src={account?.image}
						alt={`${account?.title}-image`}
						className='w-32 h-32 rounded-full'
					/>
				) : (
					<span className='w-32 h-32 relative text-background bg-foreground rounded-full'>
						<Image className='w-16 absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 stroke-current' />
					</span>
				)}
				<span>
					<p className='mb-3 font-medium text-3xl text-foreground leading-none tracking-tighter'>
						{account?.title}
					</p>
					<Button text='Edit' onClick={onEdit} disabled={!account} />
				</span>
			</div>
			<SectionSelector
				key={account?.account_id}
				sections={['Data', 'History']}
				onSectionSelect={selectSection}
				disabled={!account}
			/>
			<AnimatePresence mode='wait'>
				{selectedSection === 'Data' && account?.details !== undefined ? (
					<AccountInfoPanelData details={account?.details} />
				) : selectedSection === 'History' && account?.history !== undefined ? (
					<AccountInfoPanelHistory history={account?.history} />
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
					onClick={() => setRemovalModalOpen(true)}
					disabled={!account}
					hover
					textColor='danger'
					hoverTextColor='accent'
					hoverBgColor='danger'
				/>
				{removalModalOpen && (
					<Modal
						onButtonOneClick={() => setRemovalModalOpen(false)}
						onButtonTwoClick={() => {
							setRemovalModalOpen(false);
							onRemove();
						}}
					/>
				)}
			</div>
		</motion.aside>
	);
}

export default forwardRef(AccountInfoPanel);
