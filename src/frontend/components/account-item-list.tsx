import { motion } from 'framer-motion';

import AccountItem from './account-item';

interface Props {
	accounts: IAccount[];
	onAccountClick: () => void;
}

export default function AccountItemList({ accounts, onAccountClick }: Props) {
	return (
		<motion.ul
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			className='w-full flex flex-wrap place-content-start place-items-start gap-12'
		>
			{accounts
				.sort((a, b) => parseInt(b.favourite) - parseInt(a.favourite))
				.map((account) => (
					<AccountItem
						key={account.account_id}
						account={account}
						onClick={onAccountClick}
					/>
				))}
		</motion.ul>
	);
}
