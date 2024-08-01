import { ForwardedRef, forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';

import AccountItem from './account-item';

interface Props {
	accounts: IAccount[];
	activeAccount: IAccount;
	onAccountClick: (account: IAccount) => void;
	disabled?: boolean;
}

function AccountItemList(
	{ accounts, activeAccount, onAccountClick, disabled = false }: Props,
	ref: ForwardedRef<HTMLUListElement>
) {
	const containerRef = useRef(null);

	const handleAccountClick = (idx: number, element: HTMLElement) => {
		if (activeAccount) {
			onAccountClick(
				accounts[idx].account_id === activeAccount.account_id
					? null
					: accounts[idx]
			);
		} else {
			onAccountClick(accounts[idx]);
		}

		setTimeout(() => {
			if (ref && 'current' in ref && ref.current) {
				ref.current.scrollTop = element.offsetTop - element.offsetHeight * 2;
			} else if (containerRef.current) {
				containerRef.current.scrollTop =
					element.offsetTop - element.offsetHeight * 2;
			}
		}, 450);
	};

	return (
		<motion.ul
			ref={ref ?? containerRef}
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
						active={
							activeAccount
								? accounts[idx].account_id === activeAccount.account_id
								: false
						}
						onClick={handleAccountClick.bind(null, idx)}
						disabled={disabled}
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

export default forwardRef(AccountItemList);
