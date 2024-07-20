import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

import AccountItem from './account-item';

interface Props {
	accounts: IAccount[];
	onAccountClick: (account: IAccount) => void;
}

export default function AccountItemList({ accounts, onAccountClick }: Props) {
	const contaninerRef = useRef<HTMLUListElement>(null);
	const [activeAccount, setActiveAccount] = useState<number>(null);

	const handleAccountClick = (idx: number, element: HTMLElement) => {
		setActiveAccount((prevState) => (prevState === idx ? null : idx));
		onAccountClick(accounts[idx]);

		setTimeout(() => {
			if (contaninerRef.current) {
				contaninerRef.current.scrollTop =
					element.offsetTop - element.offsetHeight * 2;
			}
		}, 450);
	};

	return (
		<motion.ul
			ref={contaninerRef}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			className='w-full pb-12 flex flex-wrap place-content-start place-items-start gap-12 overflow-y-scroll'
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
			{accounts.length % 2 !== 0 && (
				<AccountItem
					account={accounts[0]}
					style={{
						height: 0,
						opacity: 1,
						overflow: 'hidden',
						pointerEvents: 'none',
					}}
				/>
			)}
		</motion.ul>
	);
}
