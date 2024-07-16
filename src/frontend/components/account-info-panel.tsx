import { ForwardedRef, forwardRef, useState } from 'react';
import { motion } from 'framer-motion';

import SectionSelector from './section-selector';
import Button from './button';
import { Trash } from './icons';

interface Props {
	account: IAccount;
}

function AccountInfoPanel(
	{ account }: Props,
	ref: ForwardedRef<HTMLDivElement>
) {
	const [selectedSection, setSelectedSection] = useState('Data');

	const selectSection = (section: 'Data' | 'History') => {};

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
					<Button text='Edit' onClick={() => {}} />
				</span>
			</div>
			<SectionSelector
				key={account?.account_id}
				sections={['Data', 'History']}
				onSectionSelect={selectSection}
			/>
			<div className='w-full mt-auto flex place-content-between place-items-end'>
				<p className='font-medium text-base text-muted leading-none tracking-tighter'>
					{account?.updated_at}
				</p>
				<Button
					text='Remove'
					icon={Trash}
					iconPosition='left'
					onClick={() => {}}
				/>
			</div>
		</motion.aside>
	);
}

export default forwardRef(AccountInfoPanel);
