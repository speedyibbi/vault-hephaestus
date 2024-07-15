import { motion } from 'framer-motion';
import { ForwardedRef, forwardRef } from 'react';

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
			className='max-w-xl transform translate-x-12 bg-accent rounded-2xl opacity-0'
		></motion.aside>
	);
}

export default forwardRef(AccountInfoPanel);
