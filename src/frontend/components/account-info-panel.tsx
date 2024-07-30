import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import SectionSelector from './section-selector';
import AccountInfoPanelData from './account-info-panel-data';
import AccountInfoPanelHistory from './account-info-panel-history';
import Button from './button';
import Modal from './modal';
import { Image, PlusCross, Trash } from './icons';

import { formatDateString } from '../utils/helpers';

interface Props {
	account: IAccount;
	onEdit?: () => void;
	onClose?: () => void;
	onRemove?: () => void;
	setLoading?: (loading: boolean) => void;
}

export default function AccountInfoPanel({
	account,
	onEdit = () => {},
	onClose = () => {},
	onRemove = () => {},
	setLoading = () => {},
}: Props) {
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
			initial={{ width: window.innerWidth < 1536 ? '100%' : 0, opacity: 0 }}
			animate={{ width: '100%', opacity: 1 }}
			exit={{ width: window.innerWidth < 1536 ? '100%' : 0, opacity: 0 }}
			transition={{
				duration: window.innerWidth < 1536 ? 0.15 : 0.45,
				ease: 'easeOut',
				onPlay: () => {
					setLoading(true);
				},
				onComplete: () => {
					setLoading(false);
				},
			}}
			layout
			className='2xl:max-w-xl p-12 absolute inset-0 2xl:relative transform 2xl:translate-x-12 flex flex-col place-content-start place-items-stretch gap-8 2xl:gap-16 bg-accent rounded-2xl opacity-0 overflow-hidden'
		>
			<div className='flex place-content-start place-items-center gap-6'>
				{account?.image.length > 0 ? (
					<img
						src={account?.image}
						alt={`${account?.title}-image`}
						className='w-16 2xl:w-32 h-16 2xl:h-32 rounded-full'
					/>
				) : (
					<span className='w-16 2xl:w-32 h-16 2xl:h-32 relative text-background bg-foreground rounded-full'>
						<Image className='w-8 2xl:w-16 absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 stroke-current' />
					</span>
				)}
				<span className='w-full flex flex-row 2xl:flex-col place-content-start 2xl:place-content-center place-items-center 2xl:place-items-start gap-3'>
					<p className='mr-auto 2xl:mr-0 font-medium text-3xl text-foreground leading-none tracking-tighter'>
						{account?.title}
					</p>
					<Button
						text='Edit'
						onClick={onEdit}
						disabled={!account}
						hover
						hoverTextColor='accent'
						hoverBgColor='foreground'
					/>
					<button
						onClick={onClose}
						className='2xl:hidden p-4 rounded-2xl transition-colors duration-150 hover:bg-muted-background'
					>
						<PlusCross className='w-5 stroke-current transform rotate-45' />
					</button>
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
			<div className='w-full mt-auto flex place-content-between place-items-end gap-3'>
				<p className='font-medium text-base text-muted leading-none tracking-tighter whitespace-pre-line'>
					Last modified:{' '}
					<span>{account && formatDateString(account?.updated_at)}</span>
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
