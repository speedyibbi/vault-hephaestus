import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Searchbar from '../components/searchbar';
import AccountForm from '../components/account-form';
import AccountItemList from '../components/account-item-list';
import AccountInfoPanel from '../components/account-info-panel';
import { PlusCross } from '../components/icons';

import { loadAccounts, removeAccount } from '../utils/helpers';
import { useFlashStore } from '../utils/stores/flash-store';

export default function Credentials() {
	const setFlash = useFlashStore((state) => state.setFlash);

	const [accounts, setAccounts] = useState<IAccount[]>([]);
	const [searchedAccounts, setSearchedAccounts] = useState<IAccount[]>([]);
	const [activeAccount, setActiveAccount] = useState<IAccount>(null);
	const [showForm, setShowForm] = useState(false);
	const [formAccount, setFormAccount] = useState<IAccount>(null);
	const [infoPanelActive, setInfoPanelActive] = useState(false);
	const [infoPanelKey, setInfoPanelKey] = useState(0);

	const getAccounts = async () => {
		return loadAccounts()
			.then((res) => {
				setAccounts(res);
				setSearchedAccounts(res);
			})
			.catch((_error) => {
				setFlash({
					error: true,
					text: 'Failed to load accounts',
				});
			});
	};

	const onAccountSaved = () => {
		getAccounts()
			.then(() => {
				setShowForm(false);
			})
			.catch((_error) => {
				setFlash({
					error: true,
					text: 'Something went wrong',
				});
			});
	};

	const toggleInfoPanel = async (account: IAccount) => {
		if (account !== null) setActiveAccount(account);

		if (
			infoPanelActive &&
			account !== null &&
			account.account_id !== activeAccount.account_id
		) {
			return;
		}

		setInfoPanelActive((isActive) => {
			if (isActive) {
				setActiveAccount(null);
			}

			return !isActive;
		});
	};

	const handleInfoPanelEdit = () => {
		toggleInfoPanel(null);
		setShowForm(true);
		setFormAccount(activeAccount);
	};

	const handleInfoPanelRemove = () => {
		toggleInfoPanel(null);
		removeAccount(activeAccount.account_id)
			.then(({ deleted }) => {
				if (deleted) {
					setFlash({
						error: false,
						text: 'Account removed',
					});
					getAccounts();
				} else {
					setFlash({
						error: true,
						text: 'Something went wrong',
					});
				}
			})
			.catch((_error) => {
				setFlash({
					error: true,
					text: 'Failed to remove account',
				});
			});
	};

	useEffect(() => {
		getAccounts();

		const handleResize = () => {
			setInfoPanelKey((prevKey) => prevKey + 1);
			setInfoPanelActive(false);
			setActiveAccount(null);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<motion.section
			key='credentials'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			className='h-full relative flex place-content-between place-items-stretch'
		>
			<motion.aside
				layout
				className='w-full h-full relative flex flex-col place-content-start place-items-stretch gap-24'
			>
				<span className='w-full flex place-content-between place-items-center gap-12'>
					<Searchbar
						searchArray={accounts}
						onSearch={(array: IAccount[]) => {
							setSearchedAccounts(array);
						}}
					/>
					<button
						disabled={infoPanelActive}
						onClick={() => {
							setShowForm((formState) => !formState);
							setFormAccount(null);
						}}
						className={`p-4 rounded-2xl transition-colors duration-150 ${
							!infoPanelActive ? 'hover:bg-accent' : ''
						}`}
					>
						<motion.span
							initial={{ rotateZ: '0deg' }}
							animate={{ rotateZ: showForm ? '45deg' : '0deg' }}
							exit={{ rotateZ: '0deg' }}
							className='block'
						>
							<PlusCross className='w-5 stroke-current' />
						</motion.span>
					</button>
				</span>
				<AnimatePresence mode='wait'>
					{showForm ? (
						<AccountForm
							account={formAccount}
							onAccountSaved={onAccountSaved}
						/>
					) : searchedAccounts.length > 0 ? (
						<AccountItemList
							key={JSON.stringify(searchedAccounts)}
							accounts={searchedAccounts}
							onAccountClick={(account) => toggleInfoPanel(account)}
						/>
					) : (
						<motion.span
							key='no-items'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15, ease: 'easeOut' }}
							className='w-full h-full flex place-content-center place-items-center font-medium text-xl leading-none tracking-tighter'
						>
							No items
						</motion.span>
					)}
				</AnimatePresence>
				<div className='w-full h-full absolute inset-0 bg-fade pointer-events-none' />
			</motion.aside>
			<AnimatePresence>
				{infoPanelActive && (
					<AccountInfoPanel
						key={infoPanelKey}
						account={activeAccount}
						onEdit={handleInfoPanelEdit}
						onClose={() => toggleInfoPanel(null)}
						onRemove={handleInfoPanelRemove}
					/>
				)}
			</AnimatePresence>
		</motion.section>
	);
}
