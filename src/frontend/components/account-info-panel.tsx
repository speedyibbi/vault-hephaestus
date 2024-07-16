import { ForwardedRef, forwardRef } from 'react';
import { motion } from 'framer-motion';

import Button from './button';

interface Props {
	account: IAccount;
}

function AccountInfoPanel(
	{ account }: Props,
	ref: ForwardedRef<HTMLDivElement>
) {
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
		</motion.aside>
	);
}

export default forwardRef(AccountInfoPanel);
