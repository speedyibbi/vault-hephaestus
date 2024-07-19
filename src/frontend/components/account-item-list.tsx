import { useState } from 'react';
import { motion } from 'framer-motion';

import AccountItem from './account-item';

interface Props {
	accounts: IAccount[];
	onAccountClick: (account: IAccount) => void;
}

export default function AccountItemList({ accounts, onAccountClick }: Props) {
	const [activeAccount, setActiveAccount] = useState<number>(null);

	const handleAccountClick = (idx: number) => {
		setActiveAccount((prevState) => (prevState === idx ? null : idx));
		onAccountClick(accounts[idx]);
	};

	return (
		<motion.ul
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			className='w-full flex flex-wrap place-content-start place-items-start gap-12 overflow-y-scroll'
		>
			{accounts
				.sort((a, b) => parseInt(b.favourite) - parseInt(a.favourite))
				.map((account, idx) => (
					<AccountItem
						key={account.account_id}
						account={account}
						active={idx === activeAccount}
						onClick={handleAccountClick.bind(null, idx)}
					/>
				))}
		</motion.ul>
	);
}
